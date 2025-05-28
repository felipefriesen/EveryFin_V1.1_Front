
// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import api from '../services/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciais inválidas.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <Input label="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <Button onClick={handleLogin} disabled={loading} className="mt-4 w-full">
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </div>
    </div>
  );
}
