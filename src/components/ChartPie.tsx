
// src/components/ChartPie.tsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Aluguel', value: 4000 },
  { name: 'Salários', value: 3000 },
  { name: 'Serviços', value: 2000 },
  { name: 'Marketing', value: 1000 },
];

const COLORS = ['#6366f1', '#facc15', '#10b981', '#f97316'];

export default function ChartPie() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
