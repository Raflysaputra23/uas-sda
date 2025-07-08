import CardBracket from "@/components/ui/cardBracket";
import { getData } from "@/lib/database";

const RepechangeAtas = async ({
    params
}: { params: Promise<{ ronde: string }> }) => {
    const { ronde } = await params;
    const { data } = getData(`RepechangeAtas:${ronde}`);

  return (
    <section className="mt-5 lg:p-5 lg:ps-10 overflow-x-hidden overflow-y-auto">
      <h1
        className={`text-4xl font-bold tillana-regular text-center lg:text-start text-dump mb-5`}
      >
        Repechange Atas {ronde}
      </h1>
      <CardBracket peserta={data} ronde={ronde} folder={"RepechangeAtas"} />
    </section>
  );
};

export default RepechangeAtas;
