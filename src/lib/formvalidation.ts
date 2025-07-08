"use server";

import { User } from "@/types/type";
import { formLoginSchema, formPendaftaranCsvSchema, formPendaftaranSchema, formRegisterSchema } from "./formschema";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import currentDateTime from "./date";
import { deleteData, getData, uploadFile, writeData } from "./database";

const formValidationLogin = async (prev: unknown, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const validated = formLoginSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error?.flatten().fieldErrors };
  }

  const { message, data: dataUser } = getData("User", { email: validated.data.email });
  if(message === "success") {
    if(await bcrypt.compare(validated.data.password, dataUser.password)) {
      const cookie = await cookies();
      const session = Math.random().toString(36).substring(2, 7);
      const { message, data: token } = getData("Session", { id: dataUser.id });
      if(message === "success") {
        deleteData(`Session:${token.id}`);
      }

      writeData(`Session:${session}`, dataUser);
      cookie.set("Session", session, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 3600
      });

      return {
        message: "Berhasil Login",
        type: "success",
      };
    }
  }

  return {
    message: "Email atau Password salah",
    type: "error",
  };
};

const formValidationRegister = async (prev: unknown, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  // Validasi Form
  const validated = formRegisterSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error?.flatten().fieldErrors };
  }

  try {
    // Validasi Email
    const { message: messageUser } = getData("User", { email: validated.data.email });
    if(messageUser === "success") {
      return {
        message: "Email sudah terdaftar",
        type: "error",
      };
    }

    // Upload Gambar
    const file = data.gambar as File;
    const { url } = await uploadFile(file);

    // Enkripsi Password
    validated.data.password = await bcrypt.hash(validated.data.password, 10);
    const id = Math.random().toString(36).substring(2, 9);

    const user: User = {
      id,
      username: validated.data.username,
      namaTim: validated.data.namaTim,
      email: validated.data.email,
      gambar: url,
      alamat: validated.data.alamat,
      password: validated.data.password,
      createdAt: currentDateTime(),
      role: "user",
    };

    // Simpan ke Database
    const { message } = writeData(`User:${id}`, user);
    if(message) {
      return {
        message: "Berhasil Register",
        type: "success",
      };
    }
  } catch (error) {
    return {
      message: "Error: " + error,
      type: "error",
    }
  }
};

const formValidationPendaftaranCsv = async (formData: any) => {
  for (const data of formData) {
    const validated = formPendaftaranCsvSchema.safeParse(data);
    if(!validated.success) return { success: false, error: validated.error?.flatten().fieldErrors, message: "Terjadi kesalahan" };

    const file = data?.gambar instanceof File ? data?.gambar : null;
    const { url }  = file ? await uploadFile(file) : { url: "/person.png" };

    const password = await bcrypt.hash(data?.password ?? "1234", 10);
    const id = Math.random().toString(36).substring(2, 9);
    
    const user: User = {
      id,
      username: validated.data.nama || validated.data.username || "",
      namaTim: validated.data.tim || validated.data.namaTim || "",
      email: data?.email ?? "",
      gambar: url,
      alamat: validated.data.alamat ?? "",
      password,
      createdAt: currentDateTime(),
      role: "user",
    };

    // Simpan ke Database
    const { message } = writeData(`User:${id}`, user);
    if(message !== "success") return { success: false, message: "Terjadi kesalahan", error: null }; 
  }  

  return { success: true, message: "Pendaftaran berhasil", error: null };
};

const formValidationPendaftaran = async (prev: unknown, formData: FormData) => {
  const data = Object.fromEntries(formData.entries());

  // Validasi Form
  const validated = formPendaftaranSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error?.flatten().fieldErrors };
  }

  const id = Math.random().toString(36).substring(2, 9);


  try {
    const user: User = {
      id,
      username: validated.data.username,
      namaTim: validated.data.namaTim,
      email: validated.data.email,
      gambar: "/person.png",
      alamat: validated.data.alamat,
      password: validated.data.username,
      createdAt: currentDateTime(),
      role: "user",
    };

    // Simpan ke Database
    const { message } = writeData(`User:${id}`, user);
    if(message) {
      return {
        message: "Berhasil Register",
        type: "success",
      };
    }

  } catch (error) {
    return {
      message: "Error: " + error,
      type: "error",
    }
  }
}

const logout = async () => {
  const cookie = await cookies();
  const token = cookie.get("Session");
  if(token) deleteData(`Session:${token.value}`);
  cookie.delete("Session");
}

export { formValidationLogin, formValidationRegister, logout, formValidationPendaftaran, formValidationPendaftaranCsv };
