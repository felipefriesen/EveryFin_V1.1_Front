// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [entradas, setEntradas] = useState<number>(0);
  const [saidas, setSaidas] = useState<number>(0);
  const [atividades, setAtividades] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async () => {
      try {
        const resEntradas = await axios.get('/entradas', { headers });
        const resSaidas = await axios.get('/saidas', { headers });

        const totalEntradas = resEntradas.data.reduce((acc: number, item: any) => acc + item.valor, 0);
        const totalSaidas = resSaidas.data.reduce((acc: number, item: any) => acc + item.valor, 0);

        const logs = [
          ...resEntradas.data.slice(0, 2).map((e: any) => `✅ Entrada registrada: ${e.descricao} - R$ ${e.valor.toFixed(2)}`),
          ...resSaidas.data.slice(0, 2).map((s: any) => `✅ Saída registrada: ${s.descricao} - R$ ${s.valor.toFixed(2)}`)
        ];

        setEntradas(totalEntradas);
        setSaidas(totalSaidas);
        setAtividades(logs);
      } catch (err) {
        console.error('Erro ao carregar dados do dashboard:', err);
      }
    };

    fetchData();
  }, []);

  const lucro = entradas - saidas;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600">Bem-vindo ao sistema financeiro EveryFin!</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-700">Total de Entradas</h2>
          <p className="text-green-600 text-2xl font-bold mt-2">R$ {entradas.toFixed(2)}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-700">Total de Saídas</h2>
          <p className="text-red-600 text-2xl font-bold mt-2">R$ {saidas.toFixed(2)}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-700">Lucro Líquido</h2>
          <p className="text-blue-600 text-2xl font-bold mt-2">R$ {lucro.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Atividades Recentes</h2>
        <ul className="space-y-2">
          {atividades.map((item, idx) => (
            <li key={idx} className="text-sm text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
