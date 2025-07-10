import FormPendaftaran from "@/components/Form/FormPendaftaran";
import ButtonMain from "@/components/ui/buttonMain";
import ButtonMulai from "@/components/ui/buttonMulai";
import ButtonReset from "@/components/ui/buttonReset";
import Card from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getData } from "@/lib/database";
import { User } from "@/types/type";
import { Plus, Search } from "lucide-react";
import { cookies } from "next/headers";

export const metadata = {
  title: "Data Peserta",
};

const DataPeserta = async () => {
  const cookie = await cookies();
  const token = cookie.get("Session");
  const { data: peserta }: { data: User[] } = getData("User");
  const { data: user }: { data: User } = getData(`Session:${token?.value}`);

  return (
    <section className="mt-5 lg:p-5 lg:ps-10 overflow-x-hidden overflow-y-auto">
      <header className="flex items-center justify-between mb-10">
        <h1 className={`text-4xl font-bold tillana-regular text-dump`}>
          Data Peserta
        </h1>
        <section className="flex items-center gap-4">
          <ButtonReset tooltip="Reset Peserta" folder={["User"]}>
            <span className="hidden lg:inline-block">Reset Peserta</span>
          </ButtonReset>

          <ButtonReset
            folder={[
              "Ronde",
              "Repechange",
              "RepechangeAtas",
              "RepechangeBawah",
              "Antrian",
              "Pemenang",
            ]}
            tooltip="Reset Bracket"
          >
            <span className="hidden lg:inline-block">Reset Bracket</span>
          </ButtonReset>
          <Dialog>
            <DialogTrigger asChild>
              <ButtonMain tooltip="Tambah Peserta">
                <span className="hidden lg:inline-block">Tambah</span>
                <Plus />
              </ButtonMain>
            </DialogTrigger>

            <DialogContent className="bg-slate-100 shadow !max-w-96 w-[95%]">
              <DialogHeader>
                <DialogTitle>Tambah Peserta</DialogTitle>
                <DialogDescription>
                  Admin dapat menambahkan peserta menggunakan form
                </DialogDescription>
              </DialogHeader>
              <FormPendaftaran />
            </DialogContent>
          </Dialog>
        </section>
      </header>
      <section className="flex items-center gap-3">
        <h1 className="bg-blue-500 text-slate-100 rounded-md px-4 p-2 text-sm">Total Peserta: <span className="font-semibold">{peserta.length}</span></h1>
      </section>
      <section className="mt-5 flex flex-wrap gap-5 justify-center lg:justify-start">
        {peserta.map((item: any, index: any) => (
          <Card key={index} user={user} peserta={item} />
        ))}
        {peserta.length === 0 && (
          <h1 className="text-2xl flex items-center justify-center w-full gap-2">
            Belum Ada Peserta <Search />
          </h1>
        )}
      </section>
      <ButtonMulai peserta={peserta} />
    </section>
  );
};

export default DataPeserta;
