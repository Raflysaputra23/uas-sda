import Alert from "@/components/ui/alert"
import { getData } from "@/lib/database"
import { cookies } from "next/headers"


export const metadata = {
  title: "Dashboard",
}

const Dashboard = async () => {
  const cookie = await cookies();
  const token = cookie.get("Session");
  const { data: user }  = getData(`Session:${token?.value}`);
  
  return (
    <section className="mt-5 lg:p-5 lg:ps-10">
      <h1 className={`text-3xl lg:text-4xl font-bold tillana-regular text-center lg:text-start mb-5 text-dump`}>Bracket Competition</h1>
      <Alert icon="info" header="Informasi"><p className="text-sm">Halo, <span className="poppins-semibold">{user.username}</span> Selamat datang di Bracket Competition, Anda sudah terdaftar sebagai peserta, Peserta akan diacak secara random, dan peserta akan diacak berdasarkan tim dan alamat peserta. Juara akan diumumkan pada akhir pertandingan</p></Alert>
    </section>
  )
}

export default Dashboard
