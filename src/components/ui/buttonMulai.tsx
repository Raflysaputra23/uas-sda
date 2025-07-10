"use client";

import { Loader, Swords } from "lucide-react";
import { User } from "@/types/type";
import { createBracket } from "@/lib/pertandingan";
import { useRouter } from "next/navigation";
import { MixinAlert } from "@/lib/alert";
import ButtonMain from "./buttonMain";
import { useState } from "react";

const ButtonMulai = ({ peserta }: { peserta: User[] }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePeserta = async () => {
    if (peserta.length > 32) return MixinAlert("warning", "Tidak bisa lebih dari 32 peserta");
    setLoading(true);
    const response = await createBracket(peserta);
    if (response) {
      MixinAlert("success", "Pertandingan berhasil dimulai");
      router.push(`/ronde/${response}`);
    } else {
      MixinAlert("success", "Pertandingan gagal dimulai");
    }
    setLoading(false);
  };

  return (
    <ButtonMain
      disabled={(peserta && peserta.length >= 2 ? false : true) || loading}
      tooltip={peserta && peserta.length >= 2 ? "Mulai" : "Belum Mulai"}
      className="fixed bottom-5 right-5 z-10"
      onClick={handlePeserta}
    >
      Mulai {loading ? <Loader className="animate-spin" /> : <Swords />}
    </ButtonMain>
  );
};

export default ButtonMulai;
