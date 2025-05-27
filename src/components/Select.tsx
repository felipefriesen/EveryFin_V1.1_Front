import React from 'react'

type Option = {
  label: string
  value: string | number
}

type Props = {
  label: string
  options: Option[]
  error?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>

export default function Select({ label, options, error, ...props }: Props) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">{label}</label>
      <select className="w-full px-3 py-2 border rounded" {...props}>
        <option value="">Selecione...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}