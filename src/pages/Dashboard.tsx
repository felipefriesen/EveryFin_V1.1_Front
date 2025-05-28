
// src/pages/Dashboard.tsx
import CardInfo from '../components/CardInfo';
import ChartBar from '../components/ChartBar';
import ChartPie from '../components/ChartPie';

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Visão Geral</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardInfo title="Entradas" value="R$ 12.500,00" type="entrada" />
        <CardInfo title="Saídas" value="R$ 8.200,00" type="saida" />
        <CardInfo title="Saldo Atual" value="R$ 4.300,00" type="saldo" />
        <CardInfo title="Lucro Líquido" value="R$ 2.100,00" type="lucro" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">Entradas vs Saídas por Mês</h2>
          <ChartBar />
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-4">Distribuição por Categoria</h2>
          <ChartPie />
        </div>
      </div>
    </div>
  );
}
