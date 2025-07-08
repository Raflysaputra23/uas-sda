import FormPendaftaran from "@/components/Form/FormPendaftaran";
import { Button } from "@/components/ui/button";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
          <ButtonReset folder={["User"]} > Reset Peserta </ButtonReset>
          <ButtonReset folder={["Ronde","Repechange","RepechangeAtas","RepechangeBawah","Antrian","Pemenang"]} > Reset Bracket </ButtonReset>
          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    className={`bg-blue-500 shadow text-slate-200 cursor-pointer`}
                  >
                    Tambah <Plus />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent className="bg-slate-100 shadow">
                <p>Tambah Peserta</p>
              </TooltipContent>
            </Tooltip>
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
      <section>
        <h1>Total Peserta: {peserta.length}</h1>
      </section>
      <section className="mt-5 flex flex-wrap gap-5 justify-center lg:justify-start">
        {peserta.map((item: any, index: any) => (
          <Card key={index} user={user} peserta={item} />
        ))}
        {peserta.length === 0 && <h1 className="text-2xl flex items-center justify-center w-full gap-2">Belum Ada Peserta <Search /></h1>}
      </section>
      <ButtonMulai peserta={peserta} />
    </section>
  );
};

export default DataPeserta;
