import PageRegister from "@/components/Form/PageRegister";

export const metadata = {
  title: "Register",
};

const Register = () => {

  return (
    <section className="flex items-center justify-center flex-col gap-5 max-w-96 w-[95%]">
      <PageRegister />
    </section>
  );
};

export default Register;
