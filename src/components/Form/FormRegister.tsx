"use client";

import {
  Eye,
  EyeClosed,
  ImageUp,
  Mail,
  MapPin,
  RefreshCcw,
  ShieldHalf,
  User,
} from "lucide-react";
import { Input } from "../ui/input";
import React, { useActionState, useEffect, useState } from "react";
import { formValidationRegister } from "@/lib/formvalidation";
import { MixinAlert } from "@/lib/alert";
import { Textarea } from "../ui/textarea";
import ButtonLoading from "../ui/buttonLoading";
import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args ).then(res => res.json())

const FormRegister = () => {
  const [eyeClosed, setEyeClosed] = useState<boolean>(true);
  const { data, isLoading } = useSWR(`/api/users`, fetcher)
  const [eyeClosed2, setEyeClosed2] = useState<boolean>(true);
  const [state, formAction] = useActionState(formValidationRegister, null);

  useEffect(() => {
    if (state?.type && state?.message)
      MixinAlert(
        state?.type as "error" | "warning" | "info" | "success",
        state?.message
      );
  }, [state]);

  return (
    <form action={formAction}>
      <section className="my-4">
        <label className="">Username</label>
        <section className="relative">
          <User className="absolute top-5 left-2 -translate-y-1/2" />
          <Input name="username" placeholder="Username" className="ps-10" />
          <p
            aria-live="polite"
            className={`${
              state?.error?.username && "text-red-500"
            } text-xs my-1`}
          >
            {state?.error?.username
              ? state.error.username
              : "Username is required"}
          </p>
        </section>
      </section>
      <section className="my-4">
        <label className="">Nama Tim</label>
        <section className="relative">
          <ShieldHalf className="absolute top-5 left-2 -translate-y-1/2" />
          <Input name="namaTim" placeholder="Nama Tim" className="ps-10" />
          <p
            aria-live="polite"
            className={`${
              state?.error?.namaTim && "text-red-500"
            } text-xs my-1`}
          >
            {state?.error?.namaTim
              ? state.error.namaTim
              : "Nama Tim is required"}
          </p>
        </section>
      </section>
      <section className="my-4">
        <label className="">Email</label>
        <section className="relative">
          <Mail className="absolute top-5 left-2 -translate-y-1/2" />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            className="ps-10"
          />
          <p
            aria-live="polite"
            className={`${state?.error?.email && "text-red-500"} text-xs my-1`}
          >
            {state?.error?.email ? state.error.email : "Email is required"}
          </p>
        </section>
      </section>
      <section className="my-4">
        <label className="">Alamat</label>
        <section className="relative">
          <MapPin className="absolute top-5 left-2 -translate-y-1/2" />
          <Textarea
            name="alamat"
            placeholder="Alamat"
            className="ps-10 resize-none"
            rows={7}
          />
          <p
            aria-live="polite"
            className={`${state?.error?.alamat && "text-red-500"} text-xs my-1`}
          >
            {state?.error?.alamat ? state.error.alamat : "Alamat is required"}
          </p>
        </section>
      </section>
      <section className="my-4">
        <label className="">Upload Gambar</label>
        <section className="relative">
          <ImageUp className="absolute top-5 left-2 -translate-y-1/2" />
          <Input
            name="gambar"
            type="file"
            placeholder="Alamat"
            className="ps-10"
            required
          />
          <p
            aria-live="polite"
            className={`${state?.error?.alamat && "text-red-500"} text-xs my-1`}
          >
            {state?.error?.alamat ? state.error.alamat : "Alamat is required"}
          </p>
        </section>
      </section>
      <section className="my-4">
        <label>Password</label>
        <section className="relative">
          {eyeClosed ? (
            <EyeClosed
              className="absolute top-5 left-2 -translate-y-1/2"
              onClick={() => setEyeClosed(!eyeClosed)}
            />
          ) : (
            <Eye
              className="absolute top-5 left-2 -translate-y-1/2"
              onClick={() => setEyeClosed(!eyeClosed)}
            />
          )}
          <Input
            name="password"
            type={eyeClosed ? "password" : "text"}
            placeholder="Password"
            className="ps-10"
          />
          <p
            aria-live="polite"
            className={`${
              state?.error?.password && "text-red-500"
            } text-xs my-1`}
          >
            {state?.error?.password
              ? state.error?.password
              : "Password is required"}
          </p>
        </section>
      </section>
      <section className="my-4">
        <label>Confirm Password</label>
        <section className="relative">
          {eyeClosed2 ? (
            <EyeClosed
              className="absolute top-5 left-2 -translate-y-1/2"
              onClick={() => setEyeClosed2(!eyeClosed2)}
            />
          ) : (
            <Eye
              className="absolute top-5 left-2 -translate-y-1/2"
              onClick={() => setEyeClosed2(!eyeClosed2)}
            />
          )}
          <Input
            name="confirmPassword"
            type={eyeClosed2 ? "password" : "text"}
            placeholder="Confirm Password"
            className="ps-10"
          />
          <p
            aria-live="polite"
            className={`${
              state?.error?.confirmPassword && "text-red-500"
            } text-xs my-1`}
          >
            {state?.error?.confirmPassword
              ? state.error.confirmPassword
              : "Confirm Password is required"}
          </p>
        </section>
      </section>
      <section className="my-4">
        {isLoading && 
          <p className=" text-blue-500 text-sm mb-4 flex items-center justify-center gap-2">
            Mengecek peserta <RefreshCcw size={15} className="animate-spin" />
          </p>
        }
        {data && data.data.length >= 32 &&
          <p className=" text-red-500 text-sm mb-4 text-center">
            Pendaftaran sudah ditutup
          </p>
        }
        <ButtonLoading
          disabled={isLoading ? true : data && data.data.length >= 16}
          className="bg-slate-900 text-slate-200 w-full cursor-pointer"
        >
          Daftar
        </ButtonLoading>
      </section>
    </form>
  );
};

export default FormRegister;
