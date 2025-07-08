"use client";

import { Loader, Undo2 } from "lucide-react";
import { Button } from "./button";
import { resetDatas } from "@/lib/pertandingan";
import { useState } from "react";
import { MixinAlert } from "@/lib/alert";

const ButtonReset = ({ children, folder }: { children: React.ReactNode ,folder: string[] }) => {
    const [ loading, setLoading ] = useState(false);

    const handleReset = async () => {
        setLoading(true);
        await resetDatas([...folder]);
        setLoading(false);
        MixinAlert("success", "Data berhasil direset");
    }
  return (
    <Button className="bg-blue-500 shadow text-slate-200 cursor-pointer" onClick={handleReset}>
      { loading ? <Loader className="animate-spin" /> : <><span>{children}</span> <Undo2 /></> }
    </Button>
  );
};

export default ButtonReset;
