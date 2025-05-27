import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import Input from '../components/Input'
import Button from '../components/Button'
import { formatCPF } from '../utils/formatters'

const cadastroSchema = z.object({
  email: z.string().email('E-mail inválido'),
  cpf: z.string()
    .min(14, 'CPF incompleto')
    .regex(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, 'CPF inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type CadastroData = z.infer<typeof cadastroSchema>

export default function Cadastro() {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } =
    useForm<CadastroData>({ resolver: zodResolver(cadastroSchema) })
  const navigate = useNavigate()

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '')
    setValue('cpf', formatCPF(raw))
  }

  const onSubmit = async (data: CadastroData) => {
    try {
      await api.post('/auth/register', data)
      alert('Cadastro realizado com sucesso!')
      navigate('/login')
    } catch {
      alert('Falha no cadastro. Tente novamente.')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-6 text-center">Cadastro</h1>
        <Input label="E-mail" type="email" {...register('email')} error={errors.email?.message} />
        <Input
          label="CPF"
          type="text"
          maxLength={14}
          {...register('cpf')}
          onChange={handleCPFChange}
          error={errors.cpf?.message}
        />
        <Input label="Senha" type="password" {...register('password')} error={errors.password?.message} />
        <Button type="submit" loading={isSubmitting} className="w-full mt-4">Criar conta</Button>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-500 hover:underline">Já tenho conta</a>
        </div>
      </form>
    </div>
  )
}
