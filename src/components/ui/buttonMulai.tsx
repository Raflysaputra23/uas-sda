"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Swords } from "lucide-react";
import { Button } from "./button";
import { User } from "@/types/type";
import { createBracket } from "@/lib/pertandingan";
import { useRouter } from "next/navigation";
import { MixinAlert } from "@/lib/alert";

const ButtonMulai = ({peserta}: {peserta: User[]}) => {
    const router = useRouter();

    const handlePeserta = async () => {
        if(peserta.length > 32) return MixinAlert("warning", "Tidak bisa lebih dari 32 peserta");
        const response = await createBracket(peserta);
        if (response) {
          MixinAlert("success", "Pertandingan berhasil dimulai");
          router.push(`/ronde/${response}`);
        } else {
          MixinAlert("success", "Pertandingan gagal dimulai");
        }
    }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className="fixed bottom-5 right-5 z-10 cursor-pointer bg-blue-500 text-slate-200 flex items-center gap-2 shadow" onClick={handlePeserta}>
          <Swords /> Mulai
        </Button>
      </TooltipTrigger>
      <TooltipContent className="z-10 text-xs bg-slate-200 rounded-md">
        {peserta && peserta.length >= 2 ? "Mulai" : "Belum Mulai"}
      </TooltipContent>
    </Tooltip>
  );
};

export default ButtonMulai;
