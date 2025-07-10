import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <section className="bg-linear-to-b from-[#4DA8DA] to-slate-200 to-40% flex absolute top-0 left-0 right-0 bottom-0 flex-col-reverse items-center justify-end gap-6 pt-30 z-20">
      <section className="flex flex-col items-center gap-6">
        <Loader size={40} className="animate-spin" />
        <h1 className="text-lg text-slate-900">Loading</h1>
      </section>
      <div className="w-80 h-48 relative">
        <div className="absolute top-13 left-13 w-12 h-12 animate-[blueandslate_1s_ease-in-out_infinite_alternate] bg-slate-300 hexagon border shadow"></div>
        <div className="absolute top-25 left-15 w-20 h-20 animate-[blueandslate_2s_ease-in-out_infinite_alternate] bg-slate-300 hexagon border shadow"></div>
        <div className="absolute top-9 left-25 w-20 h-20 animate-[blueandslate_3s_ease-in-out_infinite_alternate] bg-blue-500 hexagon border shadow"></div>
        <div className="absolute top-25 left-35 w-20 h-20 animate-[blueandslate_4s_ease-in-out_infinite_alternate] bg-slate-300 hexagon border shadow"></div>
        <div className="absolute top-9 left-45 w-20 h-20 animate-[blueandslate_5s_ease-in-out_infinite_alternate] bg-blue-500 hexagon border shadow"></div>
        <div className="absolute top-28 left-55 w-12 h-12 animate-[blueandslate_6s_ease-in-out_infinite_alternate] bg-blue-500 hexagon border shadow"></div>
      </div>
    </section>
  );
};

export default Loading;
