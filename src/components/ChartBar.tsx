
// src/components/ChartBar.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { mes: 'Jan', entradas: 5000, saidas: 3000 },
  { mes: 'Fev', entradas: 6000, saidas: 2500 },
  { mes: 'Mar', entradas: 7000, saidas: 4000 },
  { mes: 'Abr', entradas: 4000, saidas: 3500 },
  { mes: 'Mai', entradas: 8500, saidas: 6000 },
  { mes: 'Jun', entradas: 9200, saidas: 7200 },
];

export default function ChartBar() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="entradas" fill="#22c55e" name="Entradas" />
        <Bar dataKey="saidas" fill="#ef4444" name="Saídas" />
      </BarChart>
    </ResponsiveContainer>
  );
}
