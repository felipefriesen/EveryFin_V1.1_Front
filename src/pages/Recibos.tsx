
// src/pages/Recibos.tsx
import { useState } from 'react';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';

export default function Recibos() {
  const [tipo, setTipo] = useState('Entrada');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [clienteOuFornecedor, setClienteOuFornecedor] = useState('');

  const tipos = ['Entrada', 'Saída'];
  const nomes = ['Empresa X', 'Fornecedor A', 'Cliente Y'];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Recibos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input label="Data Início" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        <Input label="Data Fim" type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
        <Select label="Tipo de Recibo" options={tipos} value={tipo} onChange={(e) => setTipo(e.target.value)} />
        <Select label="Cliente/Fornecedor" options={nomes} value={clienteOuFornecedor} onChange={(e) => setClienteOuFornecedor(e.target.value)} />
      </div>

      <Button onClick={() => alert('Recibos gerados!')}>Gerar Recibos</Button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recibos Gerados</h2>
        <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Data</th>
              <th className="p-2">Nome</th>
              <th className="p-2">Valor</th>
              <th className="p-2">Tipo</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">21/05/2025</td>
              <td className="p-2">Empresa X</td>
              <td className="p-2">R$ 2.500,00</td>
              <td className="p-2">Entrada</td>
              <td className="p-2">
                <Button onClick={() => alert('PDF gerado!')}>Visualizar</Button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-2">19/05/2025</td>
              <td className="p-2">Fornecedor A</td>
              <td className="p-2">R$ 1.800,00</td>
              <td className="p-2">Saída</td>
              <td className="p-2">
                <Button onClick={() => alert('PDF gerado!')}>Visualizar</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
