
// src/pages/Entradas.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Entrada {
  id: string;
  descricao: string;
  valor: number;
  data: string;
}

export default function Entradas() {
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [entradas, setEntradas] = useState<Entrada[]>([]);

  const fetchEntradas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/entradas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntradas(response.data);
    } catch (error) {
      console.error("Erro ao carregar entradas:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/entradas",
        { descricao, valor: parseFloat(valor), data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDescricao("");
      setValor("");
      setData("");
      fetchEntradas();
    } catch (error) {
      console.error("Erro ao criar entrada:", error);
    }
  };

  useEffect(() => {
    fetchEntradas();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Lançar Nova Entrada</h2>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Salvar Entrada
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">Entradas Registradas</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Descrição</th>
            <th className="border p-2">Valor</th>
            <th className="border p-2">Data</th>
          </tr>
        </thead>
        <tbody>
          {entradas.map((entrada) => (
            <tr key={entrada.id}>
              <td className="border p-2">{entrada.descricao}</td>
              <td className="border p-2">R$ {entrada.valor.toFixed(2)}</td>
              <td className="border p-2">{entrada.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
