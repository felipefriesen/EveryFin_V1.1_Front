
// src/pages/CadastroClientes.tsx
import { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

export default function CadastroClientes() {
  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Cadastro de Clientes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <Input label="CPF/CNPJ" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} />
        <Input label="Razão Social (opcional)" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} />
        <Input label="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
        <Input label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <Button onClick={() => alert('Cliente salvo!')}>Salvar Cliente</Button>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Clientes Cadastrados</h2>
        <table className="w-full table-auto bg-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Nome</th>
              <th className="p-2">CPF/CNPJ</th>
              <th className="p-2">Telefone</th>
              <th className="p-2">E-mail</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">Empresa X</td>
              <td className="p-2">12.345.678/0001-99</td>
              <td className="p-2">(41) 99999-9999</td>
              <td className="p-2">empresa@exemplo.com</td>
              <td className="p-2">Editar | Excluir</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
