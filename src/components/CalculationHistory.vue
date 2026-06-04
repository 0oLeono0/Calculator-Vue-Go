<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useCalculatorStore } from '@/stores/calculator'
import type { Calculation, CalculationId } from '@/types/calculation'

defineOptions({
  name: 'CalculationHistory',
})

const calculatorStore = useCalculatorStore()
const { deletingId, errorMessage, history, isHistoryLoading } =
  storeToRefs(calculatorStore)

const refreshHistory = (): void => {
  void calculatorStore.loadHistory()
}

const editCalculation = (calculation: Calculation): void => {
  calculatorStore.startEditing(calculation)
}

const deleteHistoryItem = (id: CalculationId): void => {
  void calculatorStore.removeCalculation(id)
}
</script>

<template>
  <section class="calculation-history" aria-labelledby="history-heading">
    <div class="calculation-history__header">
      <h2 id="history-heading" class="calculation-history__title">Calculation History</h2>
      <button
        class="calculation-history__refresh"
        :disabled="isHistoryLoading"
        type="button"
        @click="refreshHistory"
      >
        {{ isHistoryLoading ? 'Refreshing...' : 'Refresh History' }}
      </button>
    </div>

    <p v-if="errorMessage" class="calculation-history__error" role="alert">
      {{ errorMessage }}
    </p>

    <p
      v-if="!isHistoryLoading && history.length === 0"
      class="calculation-history__empty"
    >
      No calculations yet.
    </p>

    <ul v-else class="calculation-history__list">
      <li
        v-for="calculation in history"
        :key="calculation.id"
        class="calculation-history__item"
      >
        <span class="calculation-history__expression">
          {{ calculation.expression }} = {{ calculation.result }}
        </span>

        <span class="calculation-history__actions">
          <button
            class="calculation-history__button"
            type="button"
            @click="editCalculation(calculation)"
          >
            Edit
          </button>
          <button
            class="calculation-history__button calculation-history__button--danger"
            :disabled="deletingId === calculation.id"
            type="button"
            @click="deleteHistoryItem(calculation.id)"
          >
            {{ deletingId === calculation.id ? 'Deleting...' : 'Delete' }}
          </button>
        </span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.calculation-history {
  margin-top: 20px;

  &__header {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  &__title {
    margin: 0;
    color: #111827;
    font-size: 1.25rem;
    line-height: 1.3;
    text-align: left;
  }

  &__refresh,
  &__button {
    border: 1px solid #d1d5db;
    border-radius: 5px;
    color: #111827;
    font-weight: 600;
    background: #f9fafb;
    cursor: pointer;
    transition:
      background-color 160ms ease,
      border-color 160ms ease,
      color 160ms ease;

    &:hover:not(:disabled) {
      background: #e5e7eb;
    }

    &:focus-visible {
      outline: 3px solid #93c5fd;
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.65;
    }
  }

  &__refresh {
    padding: 8px 12px;
    font-size: 0.95rem;
  }

  &__error {
    padding: 10px 12px;
    margin: 0 0 12px;
    border: 1px solid #fecaca;
    border-radius: 5px;
    color: #991b1b;
    text-align: left;
    background: #fef2f2;
  }

  &__empty {
    margin: 0;
    padding: 16px;
    border: 1px dashed #d1d5db;
    border-radius: 5px;
    color: #6b7280;
    background: #f9fafb;
  }

  &__list {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #d1d5db;
  }

  &__expression {
    min-width: 0;
    color: #111827;
    overflow-wrap: anywhere;
    text-align: left;
  }

  &__actions {
    display: flex;
    flex: 0 0 auto;
    gap: 8px;
  }

  &__button {
    padding: 6px 10px;
    font-size: 0.9rem;

    &--danger {
      color: #991b1b;
      border-color: #fecaca;
      background: #fef2f2;

      &:hover:not(:disabled) {
        background: #fee2e2;
      }
    }
  }
}

@media (max-width: 520px) {
  .calculation-history {
    &__header,
    &__item {
      align-items: stretch;
      flex-direction: column;
    }

    &__actions {
      width: 100%;
    }

    &__button {
      flex: 1;
    }
  }
}
</style>
