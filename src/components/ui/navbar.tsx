"use client";

import Link from "next/link";
import { GitFork, Home, ListRestart, LogOut, Trophy, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/formvalidation";
import { BoxAlert, ConfirmAlert } from "@/lib/alert";
import useSWR from "swr";
import Loading from "@/app/loading";
import ButtonMain from "./buttonMain";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: ronde, isLoading: loading1 } = useSWR(
    "/api/dynamic/ronde",
    fetcher
  );

  if (loading1) return <Loading />;

  const handleRestart = () => {
    if(window != undefined) window.location.reload();
  }

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

  return (
    <nav className="w-full bg-slate-100 rounded-md shadow-md p-3 flex justify-between gap-4 items-center">
      <section className="flex items-center gap-2">
        <Link href="/dashboard">
          <ButtonMain
            tooltip="Home"
            active={pathname === "/" || pathname === "/dashboard"}
            outline
          >
            <Home /> <span className="hidden md:inline-block">Home</span>
          </ButtonMain>
        </Link>

        <Link href={"/data-peserta"}>
          <ButtonMain
            tooltip="Data Peserta"
            active={pathname === "/data-peserta"}
            outline
          >
            <Users />{" "}
            <span className="hidden md:inline-block">Data Peserta</span>
          </ButtonMain>
        </Link>

        <ButtonMain
          disabled={ronde?.message === "success" ? false : true}
          tooltip="Bracket"
          active={pathname === "/bracket"}
          onClick={() => router.push("/bracket")}
          outline
        >
          <GitFork className="-rotate-90" />
          <span className="hidden md:inline-block">Bracket</span>
        </ButtonMain>

        <ButtonMain
          disabled
          active={pathname === "/juara"}
          outline
          tooltip="Juara"
          onClick={() => router.push("/juara")}
        >
          <Trophy /> <span className="hidden md:inline-block">Juara</span>
        </ButtonMain>

        <ButtonMain
          outline
          tooltip="Restart"
          onClick={handleRestart}
        >
          <ListRestart />
        </ButtonMain>
      </section>
      <ButtonMain bgColor="red" tooltip="logout" onClick={handleLogout}>
        <LogOut /> <span className="hidden md:inline-block">Log out</span>
      </ButtonMain>
    </nav>
  );
};

export default Navbar;
