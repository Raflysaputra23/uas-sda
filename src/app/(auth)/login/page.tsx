import FormLogin from "@/components/Form/FormLogin"
import Link from "next/link"

export const metadata = {
  title: "Login",
}
const Login = () => {
  return (
    <section className="max-w-96 w-[95%] rounded-md bg-slate-50 p-4 px-6 shadow mt-20">
      <h1 className="text-center poppins-semibold text-2xl">Welcome</h1>
      <p className="text-center text-slate-700 text-sm mb-8">Please fill out the login form</p>
      <FormLogin />
      <p className="text-center text-slate-700 text-sm my-2">
        Belum punya akun?{" "}
        <Link
          href={"/register"}
          className="text-slate-900 poppins-semibold cursor-pointer"
        >
          Daftar
        </Link>
      </p>
    </section>
  )
}

export default Login
