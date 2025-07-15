"use client";

import {
  Bracket as Brackets,
  // IRoundProps,
  Seed,
  SingleLineSeed,
  SeedItem,
  SeedTeam,
  IRenderSeedProps,
} from "react-brackets";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Loading from "@/app/loading";
import Image from "next/image";
import Link from "next/link";
import { CirclePower, Search } from "lucide-react";
import ButtonMain from "@/components/ui/buttonMain";
import { Button } from "@/components/ui/button";

const CustomSeed = ({
  seed,
  breakpoint,
  rounds,
  roundIndex,
  seedIndex,
}: IRenderSeedProps) => {
  const Wrapper = false ? SingleLineSeed : Seed;


  return (
    <>
      {seed.teams[0] && (
        <Wrapper
          mobileBreakpoint={breakpoint}
          className={`text-xs line ${
            seed.teams[0].name == "" &&
            rounds &&
            rounds[roundIndex]?.title == "1" &&
            "bracket"
          } ${
            rounds &&
            (rounds[roundIndex]?.title == "Finals" ||
              rounds[roundIndex]?.title == "Winner") &&
            (seed.roundTitle == "RepechangeAtas" ||
              seed.roundTitle == "RepechangeBawah") &&
            "mt-67"
          } relative`}
        >
         
           
          <SeedItem
            className={`${
              rounds &&
              rounds[roundIndex]?.title == "Winner" &&
              seed.roundTitle == "Utama" &&
              "!bg-yellow-600"
            } ${
              rounds &&
              rounds[roundIndex]?.title == "Winner" &&
              seed.roundTitle == "Repechange" &&
              "!bg-amber-800"
            } ${
              rounds && rounds[roundIndex]?.title != "Winner" && "!bg-red-500"
            } border !rounded-xl shadow relative ${
              seed.teams[0].name == "" &&
              rounds &&
              rounds[roundIndex]?.title == "1" &&
              "invisible"
            }`}
          >
            {rounds && rounds.length - 1 == roundIndex && (
              <Image
                src={"/mahkota.png"}
                width={60}
                height={60}
                alt={seed.teams[0].namaTim || "Gambar Tim"}
                className="absolute -top-1 -right-1"
              />
            )}
            <SeedTeam
              className={`!py-3 h-18 flex items-center justify-between w-52`}
            >
              <section className="flex items-center gap-3">
                <Image
                  src={
                    !seed.teams[0].gambar ? "/person.png" : seed.teams[0].gambar
                  }
                  width={40}
                  height={50}
                  alt={seed.teams[0].namaTim || "Gambar Tim"}
                  className="rounded-md shadow aspect-square"
                />

                <section className="text-start">
                  <h1 className="">{seed.teams[0].name}</h1>
                  <p className="text-xs font-semibold">
                    {seed.teams[0].alamat}
                  </p>
                  <p className="text-xs">{seed.teams[0].tim}</p>
                </section>
              </section>
              <p
                className={`text-xs w-10 h-8 flex items-center justify-center rounded-md bg-slate-800`}
              >
                {seed.teams[0].score}
              </p>
            </SeedTeam>
          </SeedItem>
        </Wrapper>
      )}
      {seed.teams[1] && (
        <Wrapper
          mobileBreakpoint={breakpoint}
          className={`text-xs line ${
            seed.teams[1].name == "" &&
            rounds &&
            rounds[roundIndex]?.title == "1" &&
            "bracket"
          } relative`}
        >
          {/* <Button
            className={`absolute bg-red-500 rounded text-slate-100 shadow cursor-pointer ${
              (rounds && rounds[roundIndex]?.title == "Winner") ||
              roundIndex == 0
                ? "hidden"
                : ""
            } ${team1 == "" && team2 == "" ? "hidden" : ""}`}
            style={{
              left: "-20px",
              borderRadius: "50%",
              width: "35px",
              height: "35px",
            }}
          >
            <CirclePower />
          </Button> */}

          <SeedItem
            className={`!bg-blue-500 border !rounded-xl shadow ${
              seed.teams[1].name == "" &&
              rounds &&
              rounds[roundIndex]?.title == "1" &&
              "invisible"
            }`}
          >
            <SeedTeam
              className={`!py-3 h-18 flex items-center justify-between w-52`}
            >
              <section className="flex items-center gap-3">
                <Image
                  src={
                    !seed.teams[1].gambar ? "/person.png" : seed.teams[1].gambar
                  }
                  width={40}
                  height={50}
                  alt={seed.teams[1].namaTim || "Gambar Tim"}
                  className="rounded-md shadow aspect-square"
                />
                <section className="text-start">
                  <h1 className="">{seed.teams[1].name}</h1>
                  <p className="text-xs font-semibold">
                    {seed.teams[1].alamat}
                  </p>
                  <p className="text-xs">{seed.teams[1].tim}</p>
                </section>
              </section>
              <p
                className={`text-xs w-10 h-8 flex items-center justify-center rounded-md bg-slate-800`}
              >
                {seed.teams[1].score}
              </p>
            </SeedTeam>
          </SeedItem>
        </Wrapper>
      )}
    </>
  );
};

const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

const Bracket = () => {
  const [pesertaRepechange, setPesertaRepechange] = useState([]);
  const [totalPesertaRepechange, setTotalPesertaRepechange] =
    useState<number>(0);
  const [antrian, setAntrian] = useState([]);
  const [rondeRepechange, setRondeRepechange] = useState([]);
  const [pesertaUtama, setPesertaUtama] = useState([]);
  const [pesertaRepechangeAtas, setPesertaRepechangeAtas] = useState([]);
  const [totalPesertaRepechangeAtas, setTotalPesertaRepechangeAtas] = useState(
    []
  );
  const [totalPesertaRepechangeBawah, setTotalPesertaRepechangeBawah] =
    useState([]);
  const [pesertaRepechangeBawah, setPesertaRepechangeBawah] = useState([]);
  const [totalPesertaUtama, setTotalPesertaUtama] = useState([]);
  const { data: utama, isLoading: loading1 } = useSWR(
    "/api/dynamic/ronde",
    fetcher
  );
  const { data: repechange, isLoading: loading2 } = useSWR(
    "/api/dynamic/repechange",
    fetcher
  );
  const { data: dataAntrian, isLoading: loading3 } = useSWR(
    "/api/dynamic/antrian",
    fetcher
  );

  const { data: repechangeAtas, isLoading: loading4 } = useSWR(
    "/api/dynamic/RepechangeAtas",
    fetcher
  );
  const { data: repechangeBawah, isLoading: loading5 } = useSWR(
    "/api/dynamic/RepechangeBawah",
    fetcher
  );

  useEffect(() => {
    if (repechange && utama) {
      setPesertaRepechange(repechange?.data);
      setPesertaUtama(utama?.data);
      setPesertaRepechangeAtas(repechangeAtas?.data);
      setPesertaRepechangeBawah(repechangeBawah?.data);

      const mergePeserta = repechange?.data
        .map((item: any) =>
          item.seeds
            .map((team: any) => {
              if (team.teams[0]?.name == "" && team.teams[1]?.name == "") {
                return null;
              } else if (
                team.teams[0]?.name != "" &&
                team.teams[1]?.name == ""
              ) {
                return team.teams[0];
              } else if (
                team.teams[0]?.name == "" &&
                team.teams[1]?.name != ""
              ) {
                return team.teams[1];
              } else {
                return team.teams;
              }
            })
            .flat()
            .filter(Boolean)
        )
        .flat()
        .filter(Boolean);
      setTotalPesertaRepechange(mergePeserta.length);

      const filterPeserta = utama?.data
        .map((item: any) => {
          const seeds = item?.seeds;
          for (const team of seeds) {
            if (
              team?.teams[0]?.name !== "" ||
              (team?.teams[1] && team?.teams[1]?.name !== "")
            ) {
              return item;
            }
          }
        })
        .filter(Boolean);
      setTotalPesertaUtama(filterPeserta);

      const filterRepechange = repechange?.data
        .map((item: any) => {
          const seeds = item?.seeds;
          for (const team of seeds) {
            if (
              team?.teams[0]?.name !== "" ||
              (team?.teams[1] && team?.teams[1]?.name !== "")
            ) {
              return item;
            }
          }
        })
        .filter(Boolean);
      setRondeRepechange(filterRepechange);

      const filterRepechangeAtas = repechangeAtas?.data
        .map((item: any) => {
          const seeds = item?.seeds;
          for (const team of seeds) {
            if (
              team?.teams[0]?.name !== "" ||
              (team?.teams[1] && team?.teams[1]?.name !== "")
            ) {
              return item;
            }
          }
        })
        .filter(Boolean);
      setTotalPesertaRepechangeAtas(filterRepechangeAtas);

      const filterRepechangeBawah = repechangeBawah?.data
        .map((item: any) => {
          const seeds = item?.seeds;
          for (const team of seeds) {
            if (
              team?.teams[0]?.name !== "" ||
              (team?.teams[1] && team?.teams[1]?.name !== "")
            ) {
              return item;
            }
          }
        })
        .filter(Boolean);
      setTotalPesertaRepechangeBawah(filterRepechangeBawah);
    }

    if (dataAntrian) {
      setAntrian(dataAntrian?.data);
    }
  }, [repechange, utama, dataAntrian, repechangeAtas, repechangeBawah]);

  if (loading1 || loading2 || loading3 || loading4 || loading5)
    return <Loading />;

  return (
    <section className="w-full overflow-x-hidden overflow-y-auto">
      <section>
        <h1 className="poppins-bold text-xl my-5 bg-blue-500 px-2 p-1 inline-block shadow rounded-md text-slate-200">
          Babak Utama
        </h1>
        <section className="flex items-center gap-2 my-3">
          {totalPesertaUtama &&
            totalPesertaUtama.map((item: any) => {
              return (
                <Link key={item.id} href={`/ronde/${item.title}`}>
                  <ButtonMain outline>Ronde {item.title}</ButtonMain>
                </Link>
              );
            })}
          {antrian &&
            antrian.map((item: any) => {
              if (item.bracket == "Ronde") {
                return (
                  <Link key={item.id} href={`/antrian/${item.title}`}>
                    <ButtonMain>Antrian {item.title}</ButtonMain>
                  </Link>
                );
              }
            })}
        </section>
        <section className="overflow-auto mt-10">
          {pesertaUtama?.length > 1 ? (
            <Brackets rounds={pesertaUtama} renderSeedComponent={CustomSeed} />
          ) : (
            <h1 className="text-2xl flex items-center justify-center gap-2 my-10">
              Belum ada babak utama <Search size={35} />
            </h1>
          )}
        </section>
      </section>

      <hr className="w-full h-1 bg-slate-900 my-5" />

      <section>
        <h1 className="poppins-bold text-xl my-5 bg-blue-500 px-2 p-1 inline-block rounded-md text-slate-200">
          Repechange 1 & 2
        </h1>
        <section className="flex items-center gap-2 my-3">
          {rondeRepechange &&
            totalPesertaRepechange > 1 &&
            rondeRepechange.map((item: any) => {
              return (
                <Link key={item.id} href={`/repechange/${item.title}`}>
                  <ButtonMain outline>Repechange {item.title}</ButtonMain>
                </Link>
              );
            })}
          {antrian &&
            antrian.map((item: any) => {
              if (item.bracket == "Repechange") {
                return (
                  <Link key={item.id} href={`/antrian/${item.title}`}>
                    <ButtonMain outline>Antrian {item.title}</ButtonMain>
                  </Link>
                );
              }
            })}
        </section>
        <section className="overflow-auto mt-10">
          {totalPesertaRepechange > 1 ? (
            <Brackets
              rounds={pesertaRepechange}
              renderSeedComponent={CustomSeed}
            />
          ) : (
            <h1 className="text-2xl flex items-center justify-center gap-2 my-10">
              Belum ada babak repechange 16 peserta <Search size={35} />
            </h1>
          )}
        </section>
      </section>

      <hr className="w-full h-1 bg-slate-900 my-5" />

      <section>
        <h1 className="poppins-bold text-xl my-5 bg-blue-500 px-2 p-1 inline-block rounded-md text-slate-200">
          Repechange Atas
        </h1>
        <section className="flex items-center gap-2 my-3">
          {totalPesertaRepechangeAtas &&
            totalPesertaRepechangeAtas.map((item: any) => {
              return (
                <Link key={item.id} href={`/repechangeatas/${item.title}`}>
                  <ButtonMain outline>Repechange {item.title}</ButtonMain>
                </Link>
              );
            })}
          {antrian &&
            antrian.map((item: any) => {
              if (item.bracket == "RepechangeAtas") {
                return (
                  <Link key={item.id} href={`/antrian/${item.title}`}>
                    <ButtonMain outline>
                      Antrian Repechange {item.title}
                    </ButtonMain>
                  </Link>
                );
              }
            })}
        </section>
        <section className="overflow-auto mt-10">
          {pesertaRepechangeAtas?.length > 1 ? (
            <Brackets
              rounds={pesertaRepechangeAtas}
              renderSeedComponent={CustomSeed}
            />
          ) : (
            <h1 className="text-2xl flex items-center justify-center gap-2 my-10">
              Belum ada babak Repechange Atas <Search size={35} />
            </h1>
          )}
        </section>
      </section>

      <hr className="w-full h-1 bg-slate-900 my-5" />

      <section>
        <h1 className="poppins-bold text-xl my-5 bg-blue-500 px-2 p-1 inline-block rounded-md text-slate-200">
          Repechange Bawah
        </h1>
        <section className="flex items-center gap-2 my-3">
          {totalPesertaRepechangeBawah &&
            totalPesertaRepechangeBawah.map((item: any) => {
              return (
                <Link key={item.id} href={`/repechangebawah/${item.title}`}>
                  <ButtonMain outline>Repechange {item.title}</ButtonMain>
                </Link>
              );
            })}
          {antrian &&
            antrian.map((item: any) => {
              if (item.bracket == "RepechangeBawah") {
                return (
                  <Link key={item.id} href={`/antrian/${item.title}`}>
                    <ButtonMain outline>
                      Antrian Repechange {item.title}
                    </ButtonMain>
                  </Link>
                );
              }
            })}
        </section>
        {pesertaRepechangeBawah?.length > 1 ? (
          <Brackets
            rounds={pesertaRepechangeBawah}
            renderSeedComponent={CustomSeed}
          />
        ) : (
          <h1 className="text-2xl flex items-center justify-center gap-2 my-10">
            Belum ada babak Repechange Bawah <Search size={35} />
          </h1>
        )}
      </section>
    </section>
  );
};

export default Bracket;
