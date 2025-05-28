
// src/pages/Entradas.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';

interface Entrada {
  id: string;
  descricao: string;
  valor: number;
  categoria: string;
  cliente: string;
  data: string;
}

export default function Entradas() {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cliente, setCliente] = useState('');
  const [data, setData] = useState('');
  const [entradas, setEntradas] = useState<Entrada[]>([]);

  const categorias = ['Serviços', 'Produtos', 'Consultoria'];
  const clientes = ['Empresa X', 'Cliente Y', 'Fulano'];

  const fetchEntradas = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/entradas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEntradas(response.data);
    } catch (error) {
      console.error('Erro ao carregar entradas:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/entradas',
        { descricao, valor: parseFloat(valor), categoria, cliente, data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDescricao('');
      setValor('');
      setCategoria('');
      setCliente('');
      setData('');
      fetchEntradas();
    } catch (error) {
      console.error('Erro ao salvar entrada:', error);
    }
  };

  useEffect(() => {
    fetchEntradas();
  }, []);

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

      <Button onClick={handleSubmit}>Salvar Entrada</Button>

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
            </tr>
          </thead>
          <tbody>
            {entradas.map((entrada) => (
              <tr className="border-t" key={entrada.id}>
                <td className="p-2">{entrada.data}</td>
                <td className="p-2">{entrada.descricao}</td>
                <td className="p-2">R$ {entrada.valor.toFixed(2)}</td>
                <td className="p-2">{entrada.categoria}</td>
                <td className="p-2">{entrada.cliente}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
