"use client";

import { Eye, EyeClosed, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { useActionState, useEffect, useState } from "react";
import { formValidationLogin } from "@/lib/formvalidation";
import { MixinAlert } from "@/lib/alert";
import ButtonLoading from "../ui/buttonLoading";
import { useRouter } from "next/navigation";

const FormLogin = () => {
  const [eyeClosed, setEyeClosed] = useState<boolean>(true);
  const [state, formAction] = useActionState(formValidationLogin, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.type && state?.message) {
      MixinAlert(
        state?.type as "error" | "warning" | "info" | "success",
        state?.message
      );
      if(state?.type === "success") {
        router.push("/dashboard");
      }
    }
  }, [state]);

  return (
    <form action={formAction}>
      <section className="my-4">
        <label className="">Email</label>
        <section className="relative">
          <Mail className="absolute top-5 left-2 -translate-y-1/2" />
          <Input
            type="email"
            name="email"
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
            type={eyeClosed ? "password" : "text"}
            name="password"
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
              ? state.error.password
              : "Password is required"}
          </p>
        </section>
      </section>
      <section className="my-4">
        <ButtonLoading className="bg-slate-900 text-slate-200 w-full">
          Login
        </ButtonLoading>
      </section>
    </form>
  );
};

export default FormLogin;
