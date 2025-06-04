import React, { useState } from 'react'
import Select from '../components/Select'
import Button from '../components/Button'
import api from '../services/api'
import { Transaction } from '../types'

export default function Relatorios() {
  const [type, setType] = useState<'geral'|'entrada'|'saida'>('geral')
  const [period, setPeriod] = useState({ start: '', end: '' })
  const [data, setData] = useState<Transaction[]>([])

  const generate = async () => {
    try {
      const resp = await api.post<Transaction[]>('/reports/generate', { type, ...period })
      setData(resp.data)
    } catch {
      setData([])
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Relatórios</h2>
      <div className="flex space-x-2 mb-6">
        <input type="date" value={period.start} onChange={e => setPeriod(p => ({ ...p, start: e.target.value }))} />
        <input type="date" value={period.end}   onChange={e => setPeriod(p => ({ ...p, end:   e.target.value }))} />
        <Select
          label="Tipo"
          options={[
            { label: 'Todas',   value: 'geral' },
            { label: 'Entradas', value: 'entrada' },
            { label: 'Saídas',  value: 'saida' },
          ]}
          value={type}
          onChange={e => setType(e.target.value as any)}
        />
        <Button onClick={generate}>Gerar</Button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr><th>ID</th><th>Tipo</th><th>Desc</th><th>Valor</th><th>Data</th><th>Cat</th><th>Cli</th></tr>
        </thead>
        <tbody>
          {data.map(tx => (
            <tr key={tx.id}>
              <td>{tx.id}</td><td>{tx.type}</td><td>{tx.description}</td><td>{tx.value}</td><td>{tx.date}</td><td>{tx.category}</td><td>{tx.client||'-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
