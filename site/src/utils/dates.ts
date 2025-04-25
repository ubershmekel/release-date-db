export function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime())
}

export function simpleDate(date: Date) {
  if (isValidDate(date)) {
    return date.toISOString().split('T')[0]
  } else {
    return date
  }
}

export function monthsBetween(dateA: Date, dateB: Date) {
  // Get the amount of months between two dates
  const msInMonth = 30.44 * 24 * 60 * 60 * 1000 // average month in ms
  const diffMs = Math.abs(dateB.getTime() - dateA.getTime())
  return diffMs / msInMonth
}

export function yearsBetween(dateA: Date, dateB: Date) {
  // Get the amount of months between two dates
  const msInMonth = 365 * 24 * 60 * 60 * 1000 // average month in ms
  const diffMs = Math.abs(dateB.getTime() - dateA.getTime())
  return diffMs / msInMonth
}

export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((acc, num) => acc + num, 0)
  return sum / numbers.length
}
