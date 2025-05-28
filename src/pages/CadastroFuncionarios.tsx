
// src/pages/CadastroFuncionarios.tsx
import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

export default function CadastroFuncionarios() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [cargo, setCargo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Cadastro de Funcionários</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <Input label="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
        <Input label="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} />
        <Input label="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <Button onClick={() => alert('Funcionário salvo!')}>Salvar Funcionário</Button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Funcionários Cadastrados</h2>
        <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Nome</th>
              <th className="p-2">CPF</th>
              <th className="p-2">Cargo</th>
              <th className="p-2">Telefone</th>
              <th className="p-2">E-mail</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">João Silva</td>
              <td className="p-2">123.456.789-00</td>
              <td className="p-2">Analista</td>
              <td className="p-2">(41) 98888-0000</td>
              <td className="p-2">joao@empresa.com</td>
              <td className="p-2">Editar | Excluir</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
