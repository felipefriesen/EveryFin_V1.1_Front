export interface Transaction {
  id: number
  type: 'entrada' | 'saida'
  description: string
  value: number
  date: string
  category: string
  client?: string
}