import axios from 'axios'

import type {
  Calculation,
  CalculationPayload,
  CalculationResult,
} from '@/types/calculation'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080',
})

export const getCalculations = async (): Promise<Calculation[]> => {
  const response = await apiClient.get<Calculation[]>('/calculations')

  return response.data
}

export const createCalculation = async (
  payload: CalculationPayload,
): Promise<CalculationResult> => {
  const response = await apiClient.post<CalculationResult>('/calculations', payload)

  return response.data
}

export const updateCalculation = async (
  id: Calculation['id'],
  payload: CalculationPayload,
): Promise<CalculationResult> => {
  const response = await apiClient.patch<CalculationResult>(
    `/calculations/${String(id)}`,
    payload,
  )

  return response.data
}

export const deleteCalculation = async (id: Calculation['id']): Promise<void> => {
  await apiClient.delete(`/calculations/${String(id)}`)
}
