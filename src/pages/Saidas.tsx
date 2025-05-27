import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from '../components/Select'
import Button from '../components/Button'
import api from '../services/api'
import { Transaction } from '../types'

export default function Saidas() {
  const { register, handleSubmit, reset } = useForm<Transaction>()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const load = async () => {
    try {
      const resp = await api.get<Transaction[]>('/transactions/saida')
      setTransactions(resp.data)
    } catch {
      const { mockTransactions } = await import('../services/mockData')
      setTransactions(mockTransactions.filter(t => t.type === 'saida'))
    }
  }

  useEffect(() => {
    load()
  }, [])

  const onSubmit = async (data: any) => {
    await api.post('/transactions', { ...data, type: 'saida' })
    reset()
    load()
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Lançamento de Saídas</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <input type="hidden" {...register('id')} />
        <input {...register('description')} placeholder="Descrição" className="border p-2 mr-2" />
        <input {...register('value')} placeholder="Valor" type="number" className="border p-2 mr-2" />
        <input {...register('date')} placeholder="Data" type="date" className="border p-2 mr-2" />
        <Select label="Categoria" options={[{label: 'Despesa Geral', value: 'Despesa Geral'}]} {...register('category')} />
        <Button type="submit">Salvar</Button>
      </form>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th>ID</th><th>Descrição</th><th>Valor</th><th>Data</th><th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.description}</td>
              <td>{tx.value}</td>
              <td>{tx.date}</td>
              <td>{tx.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>