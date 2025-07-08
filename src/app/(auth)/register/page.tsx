import PageRegister from "@/components/Form/PageRegister";
import Link from "next/link";

export const metadata = {
  title: "Register",
};

const Register = () => {

  return (
    <section className="flex items-center justify-center flex-col gap-5 max-w-96 w-[95%]">
      <PageRegister />
      <p className="text-center text-slate-700 text-sm my-4">
        Sudah punya akun?{" "}
        <Link
          href={"/login"}
          className="text-slate-900 poppins-semibold cursor-pointer"
        >
          Login
        </Link>
      </p>
    </section>
  );
};

export default Register;
