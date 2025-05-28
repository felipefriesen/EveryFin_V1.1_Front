
// src/pages/Entradas.tsx
import { useState } from 'react';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';

export default function Entradas() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cliente, setCliente] = useState('');
  const [data, setData] = useState('');

  const categorias = ['Serviços', 'Produtos', 'Consultoria'];
  const clientes = ['Empresa X', 'Cliente Y', 'Fulano'];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Registrar Entrada</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input label="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        <Input label="Valor (R$)" type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
        <Input label="Data" type="date" value={data} onChange={(e) => setData(e.target.value)} />
        <Select label="Categoria" options={categorias} value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        <Select label="Cliente" options={clientes} value={cliente} onChange={(e) => setCliente(e.target.value)} />
      </div>

      <Button onClick={() => alert('Entrada salva!')}>Salvar Entrada</Button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Últimas Entradas</h2>
        <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Data</th>
              <th className="p-2">Descrição</th>
              <th className="p-2">Valor</th>
              <th className="p-2">Categoria</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">20/05/2025</td>
              <td className="p-2">Serviço X</td>
              <td className="p-2">R$ 2.000,00</td>
              <td className="p-2">Consultoria</td>
              <td className="p-2">Empresa X</td>
              <td className="p-2">Editar | Excluir</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
