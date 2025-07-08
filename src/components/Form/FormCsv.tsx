"use client";

import { FileSymlink, Loader } from "lucide-react";
import { Input } from "../ui/input";
import React, {
  useCallback,
  useRef,
  useState,
} from "react";
import Papa from "papaparse";
import { formValidationPendaftaranCsv } from "@/lib/formvalidation";
import { MixinAlert } from "@/lib/alert";
import { Button } from "../ui/button";

interface FileData {
  name: string;
  size: number | string;
}


const FormCsv = () => {
  const [isDrag, setDrag] = useState<boolean>(false);
  const [data, setData] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<FileData | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { success } = await formValidationPendaftaranCsv(data);
    setLoading(false);
    MixinAlert(success ? "success" : "error", success ? "Pendaftaran berhasil" : "Pendaftaran gagal");
    setFile(null);
    setData("");
    inputRef.current?.classList.remove("hidden");
  };

  const formatBytes = (bytes: number) => {
    const units = ["B", "KB", "MB", "GB"];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
      bytes /= 1024;
      i++;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files?.[0];
    if(!file.name.endsWith(".csv")) {
        MixinAlert("error", "File harus berformat .csv");
        return false;
    }
    inputRef.current?.classList.add("hidden");
    setFile({ name: file?.name || "", size: formatBytes(file?.size) || 0 });
    if (file) {
      setLoading(true);
      parseCsv(file);
    }
  }, []);

  const parseCsv = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setData(results.data);
        setLoading(false);
      },
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = () => {
    setDrag(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file?.name.endsWith(".csv")) {
        MixinAlert("error", "File harus berformat .csv");
        return false;
    }
    setFile({
        name: file?.name || "",
        size: formatBytes(file?.size as number) || 0,
    });
    if (file) {
      setLoading(true);
      parseCsv(file);
    }
  };


  return (
    <form action="" onSubmit={handleSubmit}>
      <section className="my-4">
        <h1 className="font-semibold">File Upload</h1>
        <section
          className={`${
            isDrag ? "bg-slate-300" : "bg-slate-50"
          } py-10 flex my-4 flex-col items-center relative justify-center w-full gap-2 rounded-md border-2 border-dashed border-slate-800/80`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          //   onClick={() => inputRef.current?.click()}
        >
          {loading && (
            <div className="absolute top-0 left-0 right-0 bottom-0 z-10 flex justify-center items-center bg-slate-200/70">
              <Loader size={40} className="animate-spin" />
            </div>
          )}
          <FileSymlink size={25} />
          <p className="text-xs">{file ? "File is Uploaded" : "Upload file or Drag and Drop file here"}</p>
          <Input
            ref={inputRef}
            type="file"
            name="file"
            typeof="file"
            accept=".csv"
            onChange={handleFileChange}
            className="file:mr-4 w-3/4 border-none file:rounded-md file:border file:px-3 file:bg-slate-800 file:text-slate-100 file:text-xs cursor-pointer"
          />
          {file && (
            <div className="flex gap-2 items-center text-xs font-semibold">
              <p className="p-1 px-2 bg-slate-800 rounded-md text-slate-200">
                {file.name}
              </p>
              <p className="p-1 px-2 bg-slate-300 shadow rounded-md">
                {file.size}
              </p>
            </div>
          )}
        </section>
      </section>
      <section className="my-4">
        <Button disabled={loading || !file} type="submit" className="bg-slate-900 disabled:bg-slate-800/50 text-slate-200 w-full flex items-center gap-2">
          Submit {loading ?? <Loader className="animate-spin" />}
        </Button>
      </section>
    </form>
  );
};

export default FormCsv;
