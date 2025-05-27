export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function validateRequired(value: any): boolean {
  return value !== undefined && value !== null && value !== ''
}

export function validatePassword(password: string): boolean {
  return password.length >= 6
}