"use client"

import { RefreshCcw } from "lucide-react";
import { useFormStatus } from "react-dom"
import ButtonMain from "./buttonMain";

const ButtonLoading = ({
    children,
    className,
    type = "submit",
    disabled = false
}: Readonly<{children: React.ReactNode, className?: string, type?: "submit" | "reset" | "button", disabled?: boolean}>) => {
    const { pending } = useFormStatus();

  return  <ButtonMain bgColor="black" disabled={disabled ? disabled : pending} type={type} className={className}>
      {pending ? <span className="flex gap-2 items-center"><RefreshCcw className="animate-spin" /> {children}</span> : children}
  </ButtonMain>
  
}

export default ButtonLoading;
