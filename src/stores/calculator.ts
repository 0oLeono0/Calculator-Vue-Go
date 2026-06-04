import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import {
  createCalculation,
  deleteCalculation,
  getCalculations,
  updateCalculation,
} from '@/api/calculations'
import type { CalculatorButton } from '@/constants/calculator'
import type { Calculation, CalculationId } from '@/types/calculation'

const CLEAR_BUTTON: CalculatorButton = 'C'
const EQUALS_BUTTON: CalculatorButton = '='

export const useCalculatorStore = defineStore('calculator', () => {
  const expression = ref('')
  const result = ref('')
  const history = ref<Calculation[]>([])
  const editingId = ref<CalculationId | null>(null)
  const errorMessage = ref('')
  const isHistoryLoading = ref(false)
  const isSubmitting = ref(false)
  const deletingId = ref<CalculationId | null>(null)

  const isEditing = computed(() => editingId.value !== null)

  const clear = (): void => {
    expression.value = ''
    result.value = ''
    editingId.value = null
    errorMessage.value = ''
  }

  const appendButtonValue = (button: CalculatorButton): void => {
    if (button === CLEAR_BUTTON) {
      clear()
      return
    }

    if (button === EQUALS_BUTTON) {
      return
    }

    expression.value += button
    errorMessage.value = ''
  }

  const loadHistory = async (): Promise<void> => {
    isHistoryLoading.value = true
    errorMessage.value = ''

    try {
      history.value = await getCalculations()
    } catch (error) {
      console.error('Error fetching history:', error)
      errorMessage.value = 'Unable to load calculation history.'
    } finally {
      isHistoryLoading.value = false
    }
  }

  const submitExpression = async (): Promise<void> => {
    if (!expression.value || isSubmitting.value) {
      return
    }

    isSubmitting.value = true
    errorMessage.value = ''

    try {
      const payload = { expression: expression.value }
      const calculationResult =
        editingId.value === null
          ? await createCalculation(payload)
          : await updateCalculation(editingId.value, payload)

      result.value = String(calculationResult.result)
      expression.value = ''
      editingId.value = null
      await loadHistory()
    } catch (error) {
      console.error('Error submitting calculation:', error)
      result.value = 'Error'
      errorMessage.value = 'Unable to submit calculation.'
    } finally {
      isSubmitting.value = false
    }
  }

  const startEditing = (calculation: Calculation): void => {
    expression.value = calculation.expression
    editingId.value = calculation.id
    result.value = ''
    errorMessage.value = ''
  }

  const removeCalculation = async (id: CalculationId): Promise<void> => {
    deletingId.value = id
    errorMessage.value = ''

    try {
      await deleteCalculation(id)
      await loadHistory()
    } catch (error) {
      console.error('Error deleting calculation:', error)
      errorMessage.value = 'Unable to delete calculation.'
    } finally {
      deletingId.value = null
    }
  }

  return {
    deletingId,
    editingId,
    errorMessage,
    expression,
    history,
    isEditing,
    isHistoryLoading,
    isSubmitting,
    result,
    appendButtonValue,
    clear,
    loadHistory,
    removeCalculation,
    startEditing,
    submitExpression,
  }
})
