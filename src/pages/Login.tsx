import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input from '../components/Input';
import Button from '../components/Button';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await axios.post(
        \`\${import.meta.env.VITE_API_URL}/auth/login\`,
        data
      );
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <Input
          label="E-mail"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Senha"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />

        <Button type="submit" loading={isSubmitting} className="w-full mt-4">
          Entrar
        </Button>

        <div className="mt-4 text-center">
          <a href="/cadastro" className="text-blue-500 hover:underline">
            Criar cadastro
          </a>
        </div>
      </form>
    </div>
);
}
