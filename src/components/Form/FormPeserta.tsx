"use client"

import { MapPin, User } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ButtonLoading from "../ui/buttonLoading";
import { useActionState, useEffect } from "react";
import { formValidationPendaftaran } from "@/lib/formvalidation";
import { MixinAlert } from "@/lib/alert";

const FormPeserta = () => {
  const [state, formAction] = useActionState(formValidationPendaftaran, null);

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
        <label className="text-sm">Username</label>
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
        <label className="text-sm">Nama Tim</label>
        <section className="relative">
          <User className="absolute top-5 left-2 -translate-y-1/2" />
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
        <label className="text-sm">Email</label>
        <section className="relative">
          <User className="absolute top-5 left-2 -translate-y-1/2" />
          <Input name="email" placeholder="Email" className="ps-10" />
          <p
            aria-live="polite"
            className={`${state?.error?.email && "text-red-500"} text-xs my-1`}
          >
            {state?.error?.email ? state.error.email : "Email is required"}
          </p>
        </section>
      </section>
      <section className="my-4">
        <label className="text-sm">Alamat</label>
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
        <ButtonLoading type="submit">
          Submit
        </ButtonLoading>
      </section>
    </form>
  );
};

export default FormPeserta;
