// src/pages/Login.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Renderizou tela de login');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Teste Login</h2>

        <p className="text-sm text-center text-gray-500 mb-6">Se você está vendo essa tela, o React está funcionando.</p>

        {/* Removido o formulário para focar apenas no teste de renderização */}
      </div>
    </div>
  );
}
