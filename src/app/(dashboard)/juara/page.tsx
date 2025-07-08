"use client";

import Loading from "@/app/loading";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const Juara = () => {
  const [ juara1, setJuara1 ] = useState({
      name: "",
      score: 0,
      gambar: "",
      alamat: "",
      tim: "",
      juara: ""
    });
  const [ juara2, setJuara2 ] = useState({
      name: "",
      score: 0,
      gambar: "",
      alamat: "",
      tim: "",
      juara: ""
    });
  const [ juara3, setJuara3 ] = useState({
      name: "",
      score: 0,
      gambar: "",
      alamat: "",
      tim: "",
      juara: ""
    });
    
  const { data: juaraUtama, isLoading: loading1 } = useSWR(`/api/pemenang/1`, fetcher);
  const { data: juaraRepechange, isLoading: loading2 } = useSWR(`/api/pemenang/2`, fetcher);

  useEffect(() => {
    if(juaraUtama && juaraRepechange) {
      const mergeJuara = [...juaraUtama.data.flat(), ...juaraRepechange.data.flat()];
      mergeJuara.forEach((juara: any) => {
        if(juara.juara === "1") setJuara1(juara);
        if(juara.juara === "2") setJuara2(juara);
        if(juara.juara === "3") setJuara3(juara);
      })
    }
  },[juaraUtama, juaraRepechange]);
  
  if(loading1 || loading2) return <Loading />;

  return (
    <section className="h-[calc(100vh-100px)] w-full overflow-hidden flex items-end justify-center">
      <section className="w-72 bg-blue-800 p-4 h-40 rounded-md shadow flex justify-center items-center flex-col relative">
        <section className="-top-45 absolute flex flex-col items-center gap-4">
          {juara2?.name != "" && (
            <Image
              src={juara2?.gambar}
              width={100}
              height={100}
              alt={juara2?.name}
              className="rounded-full w-30 h-30 border-2 shadow-perak border-slate-300"
            />
          )}
          <h1 className="text-2xl tillana-bold">{juara2?.name}</h1>
        </section>
        <h1 className="text-4xl poppins-semibold">2</h1>
      </section>
      <section className="w-72 bg-blue-400 p-4 h-60 rounded-md shadow flex justify-center items-center flex-col relative">
        {/* MAHKOTA */}
        <section className="-top-45 absolute flex flex-col items-center gap-4">
          {juara1?.name != "" && (
            <>
              <Image
                src="/mahkota.png"
                width={120}
                height={120}
                alt="Riki"
                className="absolute -top-8 -right-10 rotate-30"
              />
              <Image
                src={juara1?.gambar}
                width={100}
                height={100}
                alt={juara1?.name}
                className="rounded-full w-30 h-30 border-2 shadow-winner border-amber-300"
              />
            </>
          )}
          <h1 className="text-2xl tillana-bold">{juara1?.name}</h1>
        </section>
        <h1 className="text-4xl poppins-semibold">1</h1>
      </section>
      <section className="w-72 bg-blue-800 p-4 h-30 rounded-md shadow flex justify-center items-center flex-col relative">
        <section className="-top-45 absolute flex flex-col items-center gap-4">
          {juara3?.name != "" && (
            <Image
              src={juara3?.gambar}
              width={100}
              height={100}
              alt={juara3?.name}
              className="rounded-full w-30 h-30 border-2 shadow-perunggu border-[#CD7F32]"
            />
          )}
          <h1 className="text-2xl tillana-bold">{juara3?.name}</h1>
        </section>
        <h1 className="text-4xl poppins-semibold">3</h1>
      </section>
    </section>
  );
};

export default Juara;
