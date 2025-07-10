import CardBracket from "@/components/ui/cardBracket";
import { getData } from "@/lib/database";
import { Search } from "lucide-react";

const Ronde = async ({ params }: { params: Promise<{ round: string }> }) => {
  const { round } = await params;
  const { data } = getData(`Ronde:${round}`);
  

  return (
    <section className="mt-5 lg:p-5 lg:ps-10 overflow-x-hidden overflow-y-auto">
      <h1
        className={`text-4xl font-bold tillana-regular text-center my-10 lg:text-start text-dump mb-10`}
      >
        Ronde {round}
      </h1>
      {data?.seeds ? <CardBracket peserta={data} ronde={round} folder={"Ronde"} /> : 
        <h1 className="text-center flex items-center justify-center text-2xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-2">Ronde {round} belum tersedia <Search /></h1>
      }
    </section>
  );
};

export default Ronde;
