import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from '../components/Select'
import Button from '../components/Button'
import api from '../services/api'
import { Transaction } from '../types'

export default function Entradas() {
  const { register, handleSubmit, reset } = useForm<Transaction>()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const load = async () => {
    try {
      const resp = await api.get<Transaction[]>('/transactions/entrada')
      setTransactions(resp.data)
    } catch {
      const { mockTransactions } = await import('../services/mockData')
      setTransactions(mockTransactions.filter(t => t.type === 'entrada'))
    }
  }

  useEffect(() => { load() }, [])

  const onSubmit = async (data: any) => {
    await api.post('/transactions', { ...data, type: 'entrada' })
    reset()
    load()
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Lançamento de Entradas</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex space-x-2">
        <input type="hidden" {...register('id')} />
        <input {...register('description')} placeholder="Descrição" className="border p-2" />
        <input {...register('value')} placeholder="Valor" type="number" className="border p-2" />
        <input {...register('date')} type="date" className="border p-2" />
        <Select label="Categoria" options={[{label: 'Vendas', value: 'Vendas'}]} {...register('category')} />
        <Select label="Cliente" options={[{label: 'Cliente X', value: 'Cliente X'}]} {...register('client')} />
        <Button type="submit">Salvar</Button>
      </form>
      <table className="min-w-full bg-white">
        <thead>
          <tr><th>ID</th><th>Desc</th><th>Valor</th><th>Data</th><th>Cat</th><th>Cliente</th></tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id}>
              <td>{tx.id}</td><td>{tx.description}</td><td>{tx.value}</td><td>{tx.date}</td><td>{tx.category}</td><td>{tx.client}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
