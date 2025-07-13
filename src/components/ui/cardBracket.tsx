"use client";

import { CheckCheck, Copy, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { memo, useEffect, useState } from "react";
import { Bracket, Seed, Team } from "@/types/type";
import { updateBracket } from "@/lib/pertandingan";
import { useRouter } from "next/navigation";
import { MixinAlert } from "@/lib/alert";
import ButtonMain from "./buttonMain";

const CardBracket = memo(
  ({
    peserta,
    ronde,
    folder,
  }: {
    peserta: Bracket;
    ronde: string;
    folder: string;
  }) => {
    const [skor, setSkor] = useState<Seed[]>([]);
    const [notValid, setNotValid] = useState<boolean>(false);
    const [cekPeserta, setCekPeserta] = useState<Team[]>([]);
    const [copy, setCopy] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
      if (peserta?.seeds) {
        const pemain = peserta.seeds
          .map((seed: Seed) =>
            seed.teams.map((team: Team) => {
              if (team.name !== "") {
                return team;
              } else {
                return null;
              }
            })
          )
          .flat()
          .filter(Boolean);
        setCekPeserta(pemain.length > 0 ? (pemain as Team[]) : []);

        if (pemain.length <= 1 && ronde.toLowerCase() !== "winner") {
          router.push(`/antrian/${ronde}`);
        }

        setSkor(peserta.seeds);
        for (const item of peserta.seeds) {
          if((item?.teams?.[0]?.name !== "" && item?.teams?.[1]?.name === "") || (item?.teams?.[0]?.name === "" && item?.teams?.[1]?.name !== "")) {
            setNotValid(true);
            break;
          }
        };
      }
    }, [peserta]);

    

    const handleCopy = (text: string, id: string) => {
      navigator.clipboard
        .writeText(text)
        .then(() => { 
          MixinAlert("success", "Copied");
          setCopy(id); 
        })
        .catch(() => MixinAlert("error", "Failed to cpy"));
    };

    const handlePlus = (indexSeed: number, indexTeam: number) => {
      setSkor((prevSkor: Seed[]) => {
        const newSkor = [...prevSkor].map((seed) => ({
          ...seed,
          teams: seed.teams.map((team: Team) => ({ ...team })),
        }));

        newSkor[indexSeed].teams[indexTeam].score += 1;
        return newSkor;
      });
    };

    const handleMinus = (indexSeed: number, indexTeam: number) => {
      setSkor((prevSkor: Seed[]) => {
        const newSkor = [...prevSkor].map((seed) => ({
          ...seed,
          teams: seed.teams.map((team: Team) => ({ ...team })),
        }));

        if (newSkor[indexSeed].teams[indexTeam].score === 0) return newSkor;
        newSkor[indexSeed].teams[indexTeam].score -= 1;
        return newSkor;
      });
    };

    const handleSubmit = async () => {
      if (!skor) return MixinAlert("error", "Tidak ada pertandingan");
      const nextRound = await updateBracket(skor, ronde, folder);
      MixinAlert("success", "Beralih ke ronde selanjutnya");
      if (nextRound) {
        router.push(
          `/${folder.toLocaleLowerCase()}/${nextRound.toLowerCase()}`
        );
      } else {
        router.push(`/dashboard`);
      }
    };

    if (ronde.toLowerCase() == "winner") {
      return (
        <section className="h-[60vh] w-screen flex items-center justify-center">
          <section className="w-80 bg-slate-100 p-4 rounded-md shadow flex justify-center items-center flex-col">
            <h1 className="text-2xl poppins-semibold">
              {skor && skor[0]?.teams[0]?.name == ""
                ? "Belum Ada Juara"
                : skor[0]?.teams[0]?.name}
            </h1>
            <p className="text-slate-500">{skor && skor[0]?.teams[0]?.tim}</p>
          </section>
        </section>
      );
    }

    return (
      <section className="mt-5 flex gap-5 justify-center flex-col">
        {(notValid || (cekPeserta.length <= 1)) && (
          <section className="flex items-center justify-center gap-5">
            <h1 className="text-2xl poppins-semibold">
              Belum ada pertandingan pada ronde {ronde}
            </h1>
          </section>
        )}
        {skor &&
          skor.map((item: Seed, index: number) => {
            if (item.teams[0].name !== "" && item.teams[1].name !== "") {
              return (
                <section
                  key={index}
                  className="flex items-center justify-center gap-5"
                >
                  <section className="min-w-80 max-w-96 w-80 rounded-md shadow-md bg-slate-100 p-3 flex gap-5 items-center">
                    <Image
                      src={
                        !item.teams[0].gambar
                          ? "/person.png"
                          : item.teams[0].gambar
                      }
                      width={100}
                      height={100}
                      alt="Gambar"
                      className="rounded-full shadow w-24 h-24"
                    />
                    <section className="w-full">
                      <h1 className="poppins-semibold relative">
                        {item.teams[0].name}
                        { copy != item.teams[0].id ? <Copy size={12} className="absolute top-0 right-0 cursor-pointer" onClick={() => handleCopy(item.teams[0].name, item.teams[0].id)}/> : <CheckCheck size={12} className="absolute text-green-600 top-0 right-0 cursor-pointer" />}
                      </h1>
                      <h2 className="text-sm flex">Tim {item.teams[0].tim}</h2>
                      <p className="text-xs text-slate-700 font-semibold">
                        {item.teams[0].alamat}
                      </p>
                      <section className="flex justify-around items-center my-5">
                        <ButtonMain onClick={() => handlePlus(index, 0)}>
                          <Plus />
                        </ButtonMain>
                        <p className="text-sm">{item.teams[0]?.score}</p>
                        <ButtonMain
                          bgColor="red"
                          onClick={() => handleMinus(index, 0)}
                        >
                          <Minus />
                        </ButtonMain>
                      </section>
                    </section>
                  </section>
                  <h1 className="tillana-bold text-3xl text-blue-500">VS</h1>
                  <section className="min-w-80 max-w-96 w-80 rounded-md shadow-md bg-slate-100 p-3 flex gap-5 items-center">
                    <Image
                      src={
                        !item.teams[1].gambar
                          ? "/person.png"
                          : item.teams[1].gambar
                      }
                      width={100}
                      height={100}
                      alt="Gambar"
                      className="rounded-full shadow w-24 h-24"
                    />
                    <section className="w-full">
                      <h1 className="poppins-semibold relative">
                        {item.teams[1].name}
                        { copy != item.teams[1].id ? <Copy size={12} className="absolute top-0 right-0 cursor-pointer" onClick={() => handleCopy(item.teams[1].name, item.teams[1].id)}/> : <CheckCheck size={12} className="absolute text-green-600 top-0 right-0 cursor-pointer" />}
                        
                      </h1>
                      <h2 className="text-sm flex items-center gap-2">
                        Tim {item.teams[1].tim}
                      </h2>
                      <p className="text-xs font-semibold text-slate-700">
                        {item.teams[1].alamat}
                      </p>
                      <section className="flex justify-around items-center my-5">
                        <ButtonMain onClick={() => handlePlus(index, 1)}>
                          <Plus />
                        </ButtonMain>
                        <p className="text-sm">{item.teams[1]?.score}</p>
                        <ButtonMain
                          bgColor="red"
                          onClick={() => handleMinus(index, 1)}
                        >
                          <Minus />
                        </ButtonMain>
                      </section>
                    </section>
                  </section>
                </section>
              );
            }
          })}
        <ButtonMain
          disabled={cekPeserta.length <= 1 || notValid}
          className="my-5 mx-auto w-40"
          onClick={handleSubmit}
        >
          Simpan
        </ButtonMain>
      </section>
    );
  }
);

CardBracket.displayName = "CardBracket";

export default CardBracket;
