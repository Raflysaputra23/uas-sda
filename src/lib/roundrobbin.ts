// utils/roundRobinUtils.ts
import { User } from "@/types/type";

// Menghitung jumlah slot peserta dengan algoritma pembulatan ke pangkat 2 terdekat
export const calculateSlot = (n: number) => Math.pow(2, Math.ceil(Math.log2(n)));

// Mengelompokkan peserta secara zig-zag antara atas dan bawah
export const shuffleZigzag = <T>(array: T[]): T[] => {
  const atas: T[] = [];
  const bawah: T[] = [];
  array.forEach((item, i) => (i % 2 === 0 ? atas.push(item) : bawah.push(item)));
  return [...atas, ...bawah];
};

// Mengelompokkan peserta berdasarkan alamat (kasus turnamen lokal)
export const groupByAlamat = (peserta: User[]): User[][] => {
  const byAlamat: Record<string, User[]> = {};
  peserta.forEach((user) => {
    const key = user.alamat.toLowerCase();
    byAlamat[key] = byAlamat[key] || [];
    byAlamat[key].push(user);
  });
  return Object.values(byAlamat);
};

// Membagi setiap kelompok peserta ke dalam dua sisi bracket: atas & bawah
export const splitGroup = (kelompok: User[][]): [User[], User[]] => {
  const atas: User[] = [];
  const bawah: User[] = [];
  kelompok.forEach((group) => {
    const mid = Math.ceil(group.length / 2);
    atas.push(...group.slice(0, mid));
    bawah.push(...group.slice(mid));
  });
  return [atas, bawah];
};

// Membuat kerangka seeds (pertandingan kosong) untuk satu ronde tertentu
export const createEmptySeeds = (jumlahSeed: number, roundTitle: string) => {
  return Array.from({ length: jumlahSeed }, (_, i) => ({
    id: i + 1,
    date: "",
    roundTitle,
    teams: [
      { name: "", score: 0, gambar: "", alamat: "", tim: "" },
      { name: "", score: 0, gambar: "", alamat: "", tim: "" },
    ],
  }));
};

// Membuat title ronde berdasarkan posisi
export const getRoundTitle = (index: number, totalRonde: number): string => {
  if (index === totalRonde - 1) return "Winner";
  if (index === totalRonde - 2) return "Finals";
  return `${index + 1}`;
};
