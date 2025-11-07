"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/caverna";

type CavernaState = {
  fogueiras: number;
  rodas: number;
};

export default function Home() {
  const [state, setState] = useState<CavernaState>({ fogueiras: 0, rodas: 0 });
  const [loading, setLoading] = useState(false);

  const carregarEstado = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setState(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fazerFogo = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/fazer-fogo`, { method: "POST" });
      const data = await res.json();
      setState(data);
    } finally {
      setLoading(false);
    }
  };

  const criarRoda = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/criar-roda`, { method: "POST" });
      const data = await res.json();
      setState(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarEstado();
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#8b4b27]">
      <div className="bg-[#d4b08c] text-[#3b2518] rounded-xl shadow-lg px-10 py-8 w-[400px] text-center border border-[#3b2518]/30">
        <h1 className="text-4xl font-bold mb-2 tracking-wide">CAVERNA</h1>
        <p className="mb-6 text-sm">
          Clique para Fazer Fogo ou Criar Roda e veja a evolução da tribo.
        </p>

        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={fazerFogo}
            disabled={loading}
            className="flex items-center justify-center gap-2 border border-[#3b2518] rounded-md px-4 py-2 bg-[#e8caa0] hover:bg-[#e1b77d] transition"
          >
            🔥 <span className="font-semibold">Fazer fogo</span>
          </button>

          <button
            onClick={criarRoda}
            disabled={loading}
            className="flex items-center justify-center gap-2 border border-[#3b2518] rounded-md px-4 py-2 bg-[#e8caa0] hover:bg-[#e1b77d] transition"
          >
            ⚙️ <span className="font-semibold">Criar roda</span>
          </button>
        </div>

        <div className="flex justify-center gap-8 text-sm font-semibold">
        <span>FOGUEIRAS: {state.fogueiras}</span>
        <span>RODAS: {state.rodas}</span>
      </div>
      </div>
    </main>
  );
}
