"use client";

import { useState } from "react";
import FormRegister from "./FormRegister";
import FormCsv from "./FormCsv";
import ButtonMain from "../ui/buttonMain";
import Link from "next/link";

const PageRegister = () => {
  const [page, setPage] = useState<string>("mandiri");

  return (
    <>
      <section className="flex items-center gap-2 w-full">
        <ButtonMain
          bgColor="black"
          active={page === "mandiri"}
          outline
          className="flex-1/2"
          onClick={() => setPage("mandiri")}
        >
          Via Mandiri
        </ButtonMain>
        <ButtonMain
          bgColor="black"
          active={page === "csv"}
          outline
          className="flex-1/2"
          onClick={() => setPage("csv")}
        >
          Via CSV
        </ButtonMain>
      </section>
      <section className="w-full rounded-md bg-slate-50 p-4 px-6 shadow">
        <h1 className="text-center poppins-semibold text-2xl">Welcome</h1>
        <p className="text-center text-slate-700 text-sm mb-8">
          Please fill out the register form
        </p>
        {page === "mandiri" ? <FormRegister /> : <FormCsv />}
        <p className="text-center text-slate-700 text-sm my-2">
          Sudah punya akun?{" "}
          <Link
            href={"/login"}
            className="text-slate-900 poppins-semibold cursor-pointer"
          >
            Login
          </Link>
        </p>
      </section>
    </>
  );
};

export default PageRegister;
