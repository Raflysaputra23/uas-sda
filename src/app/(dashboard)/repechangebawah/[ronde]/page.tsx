import CardBracket from "@/components/ui/cardBracket";
import { getData } from "@/lib/database";

const RepechangeBawah = async ({
    params
}: { params: Promise<{ ronde: string }> }) => {
    const { ronde } = await params;
    const { data } = getData(`RepechangeBawah:${ronde}`);

  return (
    <section className="mt-5 lg:p-5 lg:ps-10 overflow-x-hidden overflow-y-auto">
      <h1
        className={`text-4xl font-bold tillana-regular text-center lg:text-start text-dump mb-5`}
      >
        Repechange Bawah {ronde}
      </h1>
      <CardBracket peserta={data} ronde={ronde} folder={"RepechangeBawah"} />
    </section>
  );
};

export default RepechangeBawah;
