"use client";

import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface ButtonMainProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: "red" | "blue" | "black";
  children: React.ReactNode;
  tooltip?: string | boolean;
  outline?: boolean;
  active?: boolean;
}

// const bgColorMap = {
//   red: {
//     default: "red-500",
//     active: "red-700",
//     disabled: "red-500/60",
//   },
//   blue: {
//     default: "blue-500",
//     active: "blue-700",
//     disabled: "blue-500/60",
//   },
//   black: {
//     default: "slate-800",
//     active: "slate-950",
//     disabled: "slate-800/60",
//   },
// };

const ButtonMain = ({
  bgColor = "blue",
  children,
  className,
  outline = false,
  tooltip = false,
  active = false,
  ...props
}: ButtonMainProps) => {
  const colorMain = bgColor === "blue" ? `bg-blue-500 hover:bg-blue-700 ${active && "bg-blue-700 !text-slate-100"} hover:text-slate-100 disabled:bg-blue-500/60 ${outline ? `border-blue-500 ${active || "bg-transparent"} text-blue-500` : "border-transparent text-slate-100"}` :
                    bgColor === "black" ? `bg-slate-800 hover:bg-slate-950 ${active && "bg-slate-950 !text-slate-100"} hover:text-slate-100 disabled:bg-slate-800/60 ${outline ? `border-slate-800 ${active || "bg-transparent"} text-slate-800` : "border-transparent text-slate-100"}` : 
                    bgColor === "red" ? `bg-red-500 hover:bg-red-700 ${active && "bg-red-700 !text-slate-100"} hover:text-slate-100 disabled:bg-red-500/60 ${outline ? `border-redd-500 ${active || "bg-transparent"} text-red-500` : "border-transparent text-slate-100"}` : ""; 

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          {...props}
          className={`${colorMain} ${className} border transition-all rounded-md shadow cursor-pointer p-1 px-2 inline-flex items-center gap-2`}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent className={`${tooltip || "hidden"} bg-slate-100 shadow`}>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ButtonMain;
