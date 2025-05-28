
// src/pages/Relatorios.tsx
import { useState } from 'react';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';

export default function Relatorios() {
  const [tipo, setTipo] = useState('Geral');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const tipos = ['Entradas', 'Saídas', 'Geral'];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Relatórios Financeiros</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input label="Data Início" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        <Input label="Data Fim" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        <Select label="Tipo de Relatório" options={tipos} value={tipo} onChange={(e) => setTipo(e.target.value)} />
      </div>

      <div className="flex gap-4">
        <Button onClick={() => alert('Relatório gerado!')}>Gerar Relatório</Button>
        <Button onClick={() => alert('Exportado para PDF')}>Exportar PDF</Button>
        <Button onClick={() => alert('Exportado para Excel')}>Exportar Excel</Button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Resultado</h2>
        <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Data</th>
              <th className="p-2">Descrição</th>
              <th className="p-2">Valor</th>
              <th className="p-2">Categoria</th>
              <th className="p-2">Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">20/05/2025</td>
              <td className="p-2">Serviço Prestado</td>
              <td className="p-2">R$ 2.000,00</td>
              <td className="p-2">Consultoria</td>
              <td className="p-2">Entrada</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">18/05/2025</td>
              <td className="p-2">Pagamento aluguel</td>
              <td className="p-2">R$ 3.000,00</td>
              <td className="p-2">Aluguel</td>
              <td className="p-2">Saída</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
