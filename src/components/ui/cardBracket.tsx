"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "./button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Seed } from "@/types/type";
import { updateBracket } from "@/lib/pertandingan";
import { useRouter } from "next/navigation";
import { MixinAlert } from "@/lib/alert";



const CardBracket = ({ peserta, ronde, folder }: { peserta: any ; ronde: string; folder:string }) => {
  const [skor, setSkor] = useState<Seed[]>([]);
  const [cekPeserta, setCekPeserta] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    if(peserta?.seeds) {
      const cekPeserta = peserta?.seeds?.map((team: any) => team.teams.map((t: any) => {
        if(t.name !== "") {
          return t
        } else {
          return null
        }
      })).flat().filter(Boolean);
      setCekPeserta(cekPeserta);

      if(cekPeserta.length <= 1 && ronde !== "winner") {
        router.push(`/antrian/${ronde}`);
      }
      setSkor(peserta.seeds);
    }
  }, [peserta]);


  const handlePlus = (indexSeed: number, indexTeam: number) => {
    setSkor((prevSkor: Seed[]) => {
      const newSkor = [...prevSkor].map((seed) => ({
        ...seed,
        teams: seed.teams.map((team: any) => ({ ...team })),
      }));

      newSkor[indexSeed].teams[indexTeam].score += 1;
      return newSkor;
    });
  };

  const handleMinus = (indexSeed: number, indexTeam: number) => {
    setSkor((prevSkor: Seed[]) => {
      const newSkor = [...prevSkor].map((seed) => ({
        ...seed,
        teams: seed.teams.map((team: any) => ({ ...team })),
      }));

      newSkor[indexSeed].teams[indexTeam].score -= 1;
      return newSkor;
    });
  };

  const handleSubmit = async () => {
    if(!skor) return MixinAlert("error", "Tidak ada pertandingan");
    const nextRound = await updateBracket(skor, ronde, folder);
    MixinAlert("success", "Beralih ke ronde selanjutnya");
    if(nextRound) {
      router.push(`/${folder.toLocaleLowerCase()}/${nextRound.toLowerCase()}`);
    } else {
      router.push(`/dashboard`);
    }
  }

  if(ronde.toLowerCase() == "winner") {
    return (
      <section className="h-[60vh] w-screen flex items-center justify-center">
        <section className="w-80 bg-slate-100 p-4 rounded-md shadow flex justify-center items-center flex-col">
          <h1 className="text-2xl poppins-semibold">{skor && skor[0]?.teams[0]?.name == "" ? "Belum Ada Juara" : skor && skor[0]?.teams[0]?.name}</h1>
          <p className="text-slate-500">{skor && skor[0]?.teams[0]?.tim}</p>
        </section>
      </section>
    )
  }

  return (
    <section className="mt-5 flex gap-5 justify-center flex-col">
      {cekPeserta && cekPeserta <= 1 && (
        <section className="flex items-center justify-center gap-5">
          <h1 className="text-2xl poppins-semibold">Belum Ada Pertandingan</h1>
        </section>
      )}
      {skor &&
        skor.map((item: any, index: number) => {
          return (
            <section
              key={index}
              className="flex items-center justify-center gap-5"
            >
              {(item.teams[0]?.name !== "" && item.teams[1]?.name !== "") && 
                <>
                  <section className="min-w-80 max-w-96 w-80 rounded-md shadow-md bg-slate-100 p-3 flex gap-5 items-center">
                    <Image
                      src={!item.teams[0]?.gambar ? "/person.png" : item.teams[0]?.gambar}
                      width={100}
                      height={100}
                      alt="Gambar"
                      className="rounded-full shadow w-24 h-24"
                    />
                    <section className="w-full">
                      <h1 className="poppins-semibold">{item.teams[0]?.name}</h1>
                      <h2 className="text-sm flex">Tim {item.teams[0]?.tim}</h2>
                      <p className="text-xs"></p>
                      <section className="flex justify-around items-center my-5">
                        <Button
                          className="bg-blue-500 text-slate-200"
                          onClick={() => handlePlus(index, 0)}
                        >
                          <Plus />
                        </Button>
                        <p className="text-sm">{item.teams[0]?.score}</p>
                        <Button
                          className="bg-red-500 text-slate-200"
                          onClick={() => handleMinus(index, 0)}
                        >
                          <Minus />
                        </Button>
                      </section>
                    </section>
                  </section>
                  <h1 className="tillana-bold text-3xl text-blue-500">VS</h1>
                  <section className="min-w-80 max-w-96 w-80 rounded-md shadow-md bg-slate-100 p-3 flex gap-5 items-center">
                    <Image
                      src={!item.teams[1]?.gambar ? "/person.png" : item.teams[1]?.gambar}
                      width={100}
                      height={100}
                      alt="Gambar"
                      className="rounded-full shadow w-24 h-24"
                    />
                    <section className="w-full">
                      <h1 className="poppins-semibold">{item.teams[1]?.name}</h1>
                      <h2 className="text-sm flex items-center gap-2">
                        Tim {item.teams[1]?.tim}
                      </h2>
                      <p className="text-xs"></p>
                      <section className="flex justify-around items-center my-5">
                        <Button
                          className="bg-blue-500 text-slate-200"
                          onClick={() => handlePlus(index, 1)}
                        >
                          <Plus />
                        </Button>
                        <p className="text-sm">{item.teams[1]?.score}</p>
                        <Button
                          className="bg-red-500 text-slate-200"
                          onClick={() => handleMinus(index, 1)}
                        >
                          <Minus />
                        </Button>
                      </section>
                    </section>
                  </section>
                </>
              }
            </section>
          );
        })}
      <Button disabled={cekPeserta <= 1} className="my-5 cursor-pointer disabled:bg-blue-500/50 bg-blue-500 hover:bg-blue-700 mx-auto w-40 text-slate-200" onClick={handleSubmit}>
        Simpan
      </Button>
    </section>
  );
};

export default CardBracket;
