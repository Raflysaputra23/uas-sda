/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { Button } from "./button";
import { GitFork, Home, LogOut, Trophy, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/formvalidation";
import { BoxAlert, ConfirmAlert } from "@/lib/alert";
import useSWR from "swr";
import Loading from "@/app/loading";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { useEffect, useState } from "react";
import { User } from "@/types/type";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: ronde, isLoading: loading1 } = useSWR("/api/dynamic/ronde", fetcher);

  if (loading1) return <Loading />;

  const handleLogout = async () => {
    const response = await ConfirmAlert(
      "Apakah anda yakin ingin logout?",
      "warning"
    );
    if (response) {
      await logout();
      BoxAlert("Berhasil Logout", "success", "success");
      router.push("/login");
    }
  };

  const handleRound = (url: string) => {
    router.push(url);
  };

  return (
    <nav className="w-full bg-slate-100 rounded-md shadow-md p-3 flex justify-between gap-4 items-center">
      <section className="flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild>
              <Link
                className={`${
                  pathname === "/dashboard"
                    ? "bg-blue-500 text-slate-200"
                    : "text-slate-900 border"
                } shadow flex items-center gap-2`}
                href="/dashboard"
              >
                <Home /> <span className="hidden md:inline-block">Home</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-100 shadow">
            <p>Home</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild>
              <Link
                className={`${
                  pathname === "/data-peserta"
                    ? "bg-blue-500 text-slate-200"
                    : "text-slate-900 border"
                } shadow flex items-center gap-2`}
                href="/data-peserta"
              >
                <Users />{" "}
                <span className="hidden md:inline-block">Data Peserta</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-100 shadow">
            <p>Data Peserta</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled={ronde?.message === "success" ? false : true}
              onClick={() => handleRound("/bracket")}
              className={`${
                pathname === "/bracket"
                  ? "bg-blue-500 text-slate-200"
                  : "text-slate-900 border"
              } shadow flex items-center gap-2 disabled:cursor-not-allowed cursor-pointer`}
            >
              <GitFork />{" "}
              <span className="hidden md:inline-block">Bracket</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-100 shadow">
            <p>Bracket</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              disabled
              onClick={() => handleRound("/juara")}
              className={`${
                pathname === "/juara"
                  ? "bg-blue-500 text-slate-200"
                  : "text-slate-900 border"
              } shadow flex items-center gap-2 disabled:cursor-not-allowed cursor-pointer`}
            >
              <Trophy /> <span className="hidden md:inline-block">Juara</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-slate-100 shadow">
            <p>Juara</p>
          </TooltipContent>
        </Tooltip>
      </section>
      <Button
        className="bg-red-500 text-slate-200 shadow flex items-center gap-2 cursor-pointer"
        onClick={handleLogout}
      >
        <LogOut /> <span className="hidden md:inline-block">Log out</span>
      </Button>
    </nav>
  );
};

export default Navbar;
