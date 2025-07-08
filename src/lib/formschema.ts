import { z } from "zod";
 
const formLoginSchema = z.object({
  email: z.string().email("Email harus Valid"),
  password: z.string().min(4, "Password minimal 4 karakter"),
});

const formRegisterSchema = z.object({
  username: z.string().min(4, "Username minimal 4 karakter"),
  namaTim: z.string().min(2, "Nama Tim minimal 2 karakter"),
  email: z.string().email("Email harus Valid"),
  alamat: z.string().min(2, "Alamat minimal 2 karakter"),
  password: z.string().min(4, "Password minimal 4 karakter"),
  confirmPassword: z.string().min(4, "Password minimal 4 karakter"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Password tidak sama",
  path: ["confirmPassword"],
});

const formPendaftaranSchema = z.object({
  username: z.string().min(4, "Username minimal 4 karakter"),
  namaTim: z.string().min(2, "Nama Tim minimal 2 karakter"),
  email: z.string().email("Email harus valid"),
  alamat: z.string().min(2, "Alamat minimal 2 karakter")
});

const formPendaftaranCsvSchema = z.object({
  username: z.string().min(2, "Username minimal 4 karakter").optional(),
  namaTim: z.string().min(2, "Nama Tim minimal 2 karakter").optional(),
  nama: z.string().min(2, "Nama minimal 2 karakter").optional(),
  tim: z.string().optional(),
  alamat: z.string().min(2, "Alamat minimal 2 karakter").optional(),
  email: z.string().email("Email harus valid").optional()
})


export { formLoginSchema, formRegisterSchema, formPendaftaranSchema, formPendaftaranCsvSchema };