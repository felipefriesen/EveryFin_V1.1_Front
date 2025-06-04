import React, { useEffect, useState } from 'react'
import api from '../services/api'
import CardInfo from '../components/CardInfo'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

type Summary = {
  totalEntradas: number
  totalSaidas: number
  lucro: number
  projection: number
  history: { date: string; value: number }[]
}

export default function Dashboard() {
  const [summary, setSummary] = useState<Summary>({
    totalEntradas: 0,
    totalSaidas: 0,
    lucro: 0,
    projection: 0,
    history: [],
  })

  useEffect(() => {
    api.get<Summary>('/dashboard/summary')
      .then(resp => setSummary(resp.data))
      .catch(() => {})
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <CardInfo title="Total Entradas" value={summary.totalEntradas} />
        <CardInfo title="Total Saídas" value={summary.totalSaidas} />
        <CardInfo title="Lucro Líquido" value={summary.lucro} />
        <CardInfo title="Projeção Mensal" value={summary.projection} />
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={summary.history}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
