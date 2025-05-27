import React from 'react'

type Props = {
  title: string
  value: number | string
  icon?: React.ReactNode
  trend?: 'up' | 'down'
  trendValue?: string
}

export default function CardInfo({ title, value, icon, trend, trendValue }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        {trend && trendValue && (
          <span className={`text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trendValue}
          </span>
        )}
      </div>
      {icon && <div className="text-3xl">{icon}</div>}
    </div>
  )
}