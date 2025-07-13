"use client";

import { User } from "@/types/type";
import Image from "next/image";
import { Trash } from "lucide-react";
import { BoxAlert, ConfirmAlert } from "@/lib/alert";
import ButtonMain from "./buttonMain";

const Card = ({ peserta, user }: { peserta: User; user: User }) => {

  const handleDelete = async () => {
    const response = await ConfirmAlert(
      `Apakah anda yakin ingin menghapus "${peserta.username}"`,
      "warning"
    );

    if (response) {
      const responseMessage = await fetch(`/api/dynamic/user/${peserta.id}`, {
        method: "DELETE",
      });
      if (responseMessage.status === 200) {
        BoxAlert("Berhasil menghapus peserta", "success", "success");
      }
    }
  };

  return (
    <section
      className="min-w-80 max-w-96 w-80 rounded-md shadow-md bg-slate-100 p-3 flex gap-4 relative overflow-hidden"
    >
      {user.id === peserta.id && (
        <p className="absolute top-0 right-0 bg-blue-500 p-2 text-slate-200 rounded-md text-xs inline-block">
          You
        </p>
      )}
      <ButtonMain
        bgColor="red"
        className="absolute bottom-0 right-0"
        onClick={handleDelete}
      >
        <Trash />
      </ButtonMain>
      <section className="flex items-center justify-center">
        <Image
          src={!peserta.gambar ? "/person.png" : peserta.gambar}
          className="rounded-md shadow h-28"
          priority
          width={100}
          height={100}
          alt={peserta.username}
        />
      </section>
      <section className="flex flex-col justify-between">
        <section>
          <h1 className="poppins-semibold">{peserta.username}</h1>
          <h2 className="text-xs text-slate-800">
            Tim <span className="poppins-semibold">{peserta.namaTim}</span>
          </h2>
        </section>
        <section>
          <p className="text-xs text-slate-800 poppins-semibold">
            Pendaftaran:
          </p>
          <p className="text-xs text-slate-600 italic">{peserta.createdAt}</p>
        </section>
      </section>
    </section>
  );
};

export default Card;
