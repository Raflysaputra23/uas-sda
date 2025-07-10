"use client";

import { Loader, Undo2 } from "lucide-react";
import { resetDatas } from "@/lib/pertandingan";
import { useState } from "react";
import { ConfirmAlert, MixinAlert } from "@/lib/alert";
import ButtonMain from "./buttonMain";

const ButtonReset = ({
  children,
  folder,
  tooltip = false,
}: {
  children: React.ReactNode;
  folder: string[];
  tooltip?: string | boolean;
}) => {
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    const response = await ConfirmAlert(
      `Apakah anda yakin ingin mereset data ini?`,
      "warning"
    );

    if (response) {
      setLoading(true);
      await resetDatas([...folder]);
      setLoading(false);
      MixinAlert("success", "Data berhasil direset");
    }
  };

  return (
    <ButtonMain disabled={loading} tooltip={tooltip} onClick={handleReset}>
      {children} {loading ? <Loader className="animate-spin" /> : <Undo2 />}
    </ButtonMain>
  );
};

export default ButtonReset;
