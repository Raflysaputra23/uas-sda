"use client";

import { Button } from "@/components/ui/button"
import { useState } from "react"
import FormRegister from "./FormRegister";
import FormCsv from "./FormCsv";

const PageRegister = () => {
    const [page, setPage] = useState<string>("mandiri");

  return (
    <>
     <section className="flex items-center gap-2 w-full">
        <Button className={`${page == "mandiri" ? "bg-slate-800 text-slate-200" : "bg-slate-300"} shadow border cursor-pointer hover:bg-slate-800 hover:text-slate-200 hover:border-slate-200/20 border-slate-800/20 flex-1/2`} onClick={() => setPage("mandiri")}>Via Mandiri</Button>
        <Button className={`${page == "csv" ? "bg-slate-800 text-slate-200" : "bg-slate-300"} shadow border cursor-pointer hover:bg-slate-800 hover:text-slate-200 hover:border-slate-200/20 border-slate-800/20 flex-1/2`} onClick={() => setPage("csv")}>Via CSV</Button>
      </section>
      <section className="w-full rounded-md bg-slate-50 p-4 px-6 shadow">
        <h1 className="text-center poppins-semibold text-2xl">Welcome</h1>
        <p className="text-center text-slate-700 text-sm mb-8">
          Please fill out the register form
        </p>
        { page === "mandiri" ? <FormRegister /> : <FormCsv /> }
      </section> 
    </>
  )
}

export default PageRegister
