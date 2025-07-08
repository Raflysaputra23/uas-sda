"use client";

import React, { useState } from 'react'
import { Button } from '../ui/button';
import FormCsv from './FormCsv';
import FormPeserta from './FormPeserta';

const FormPendaftaran = () => {
    const [page, setPage] = useState<string>("mandiri");
  return (
    <section className='w-full flex-col gap-3'>
      <section className='flex items-center w-full gap-3'>
        <Button className={`${page == "mandiri" ? "bg-slate-800 text-slate-200" : "bg-slate-300"} shadow border cursor-pointer hover:bg-slate-800 hover:text-slate-200 hover:border-slate-200/20 border-slate-800/20 flex-1/2`} onClick={() => setPage("mandiri")}>Via Mandiri</Button>
        <Button className={`${page == "csv" ? "bg-slate-800 text-slate-200" : "bg-slate-300"} shadow border cursor-pointer hover:bg-slate-800 hover:text-slate-200 hover:border-slate-200/20 border-slate-800/20 flex-1/2`} onClick={() => setPage("csv")}>Via CSV</Button>
      </section>
      { page === "mandiri" ? <FormPeserta /> : <FormCsv /> }
    </section>
  )
}

export default FormPendaftaran;
