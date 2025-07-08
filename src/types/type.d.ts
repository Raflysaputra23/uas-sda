export interface User {
    id: string;
    noUrut?: string;
    username: string;
    namaTim: string;
    email: string;
    alamat: string;
    gambar: string;
    ronde?: string; 
    score?: {
        ronde1?: {
            score1?: number;
            score2?: number;
            score3?: number;
            totalScore?: number;
        }
        ronde2?: {
            score1?: number;
            score2?: number;
            score3?: number;
            totalScore?: number;
        }
        ronde3?: {
            score1?: number;
            score2?: number;
            score3?: number;
            totalScore?: number;
        }
        ronde4?: {
            score1?: number;
            score2?: number;
            score3?: number;
            totalScore?: number;
        }
    }
    password: string;
    createdAt: string;
    role: "user" | "admin";
}

interface Team {
  id: string;
  name: string;
  tim: string;
  score: number;
  alamat?: string;
  gambar?: string;
  kalahDari?: string;
  ronde?: string;
}

export interface Seed {
  id: number;
  date: string;
  teams: Team[];
}