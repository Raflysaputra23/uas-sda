"use client";

import React, { useState } from 'react'
import FormCsv from './FormCsv';
import FormPeserta from './FormPeserta';
import ButtonMain from '../ui/buttonMain';

const FormPendaftaran = () => {
    const [page, setPage] = useState<string>("mandiri");
  return (
    <section className='w-full flex-col gap-3'>
      <section className='flex items-center w-full gap-3'>
        <ButtonMain bgColor="black" active={page === "mandiri"} outline className="flex-1/2" onClick={() => setPage("mandiri")}>Via Mandiri</ButtonMain>
        <ButtonMain bgColor="black" active={page === "csv"} outline className="flex-1/2" onClick={() => setPage("csv")}>Via CSV</ButtonMain>
      </section>
      { page === "mandiri" ? <FormPeserta /> : <FormCsv /> }
    </section>
  )
}

export default FormPendaftaran;
