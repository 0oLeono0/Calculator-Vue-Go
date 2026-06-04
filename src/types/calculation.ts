export type CalculationId = number | string

export interface Calculation {
  id: CalculationId
  expression: string
  result: number | string
}

export interface CalculationPayload {
  expression: string
}

export interface CalculationResult {
  result: number | string
}
