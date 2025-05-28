
// src/pages/Saidas.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';

interface Saida {
  id: string;
  descricao: string;
  valor: number;
  categoria: string;
  cliente: string;
  data: string;
}

export default function Saidas() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cliente, setCliente] = useState('');
  const [data, setData] = useState('');
  const [saidas, setSaidas] = useState<Saida[]>([]);

  const categorias = ['Despesas Fixas', 'Operacional', 'Impostos'];
  const clientes = ['Empresa A', 'Fornecedor B', 'Parceiro C'];

  const fetchSaidas = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/saidas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSaidas(response.data);
    } catch (error) {
      console.error('Erro ao carregar saídas:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/saidas',
        { descricao, valor: parseFloat(valor), categoria, cliente, data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDescricao('');
      setValor('');
      setCategoria('');
      setCliente('');
      setData('');
      fetchSaidas();
    } catch (error) {
      console.error('Erro ao salvar saída:', error);
    }
  };

  useEffect(() => {
    fetchSaidas();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Registrar Saída</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input label="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        <Input label="Valor (R$)" type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
        <Input label="Data" type="date" value={data} onChange={(e) => setData(e.target.value)} />
        <Select label="Categoria" options={categorias} value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        <Select label="Fornecedor" options={clientes} value={cliente} onChange={(e) => setCliente(e.target.value)} />
      </div>

      <Button onClick={handleSubmit}>Salvar Saída</Button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Últimas Saídas</h2>
        <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Data</th>
              <th className="p-2">Descrição</th>
              <th className="p-2">Valor</th>
              <th className="p-2">Categoria</th>
              <th className="p-2">Fornecedor</th>
            </tr>
          </thead>
          <tbody>
            {saidas.map((saida) => (
              <tr className="border-t" key={saida.id}>
                <td className="p-2">{saida.data}</td>
                <td className="p-2">{saida.descricao}</td>
                <td className="p-2">R$ {saida.valor.toFixed(2)}</td>
                <td className="p-2">{saida.categoria}</td>
                <td className="p-2">{saida.cliente}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
