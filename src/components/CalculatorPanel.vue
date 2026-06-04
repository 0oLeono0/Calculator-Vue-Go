<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { CALCULATOR_BUTTONS, type CalculatorButton } from '@/constants/calculator'
import { useCalculatorStore } from '@/stores/calculator'

defineOptions({
  name: 'CalculatorPanel',
})

const calculatorStore = useCalculatorStore()
const { expression, result, isEditing, isSubmitting } = storeToRefs(calculatorStore)

const handleButtonClick = (button: CalculatorButton): void => {
  if (button === '=') {
    void calculatorStore.submitExpression()
    return
  }

  calculatorStore.appendButtonValue(button)
}
</script>

<template>
  <section class="calculator-panel" aria-labelledby="calculator-heading">
    <h2 id="calculator-heading" class="calculator-panel__heading">Calculator panel</h2>

    <div class="calculator-panel__display">
      <label class="calculator-panel__label" for="calculator-expression">
        Expression
      </label>
      <input
        id="calculator-expression"
        class="calculator-panel__input"
        :value="expression"
        placeholder="Expression"
        readonly
        type="text"
      />
      <output class="calculator-panel__result" aria-live="polite">
        {{ result || '\u00a0' }}
      </output>
    </div>

    <div class="calculator-panel__buttons" aria-label="Calculator buttons">
      <button
        v-for="button in CALCULATOR_BUTTONS"
        :key="button"
        class="calculator-panel__button"
        :class="{
          'calculator-panel__button--equals': button === '=',
          'calculator-panel__button--clear': button === 'C',
        }"
        :disabled="button === '=' && isSubmitting"
        type="button"
        @click="handleButtonClick(button)"
      >
        {{ button }}
      </button>
    </div>

    <p v-if="isEditing" class="calculator-panel__edit-status" aria-live="polite">
      Editing selected calculation
    </p>
  </section>
</template>

<style scoped lang="scss">
.calculator-panel {
  padding: 20px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;

  &__heading {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  &__display {
    margin-bottom: 20px;
  }

  &__label {
    display: block;
    margin-bottom: 6px;
    color: #4b5563;
    font-size: 0.875rem;
    font-weight: 600;
    text-align: left;
  }

  &__input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #d1d5db;
    border-radius: 5px;
    color: #111827;
    font-size: 1.5rem;
    text-align: right;
    background: #f9fafb;
  }

  &__result {
    display: block;
    min-height: 1.5rem;
    margin-top: 6px;
    color: #4b5563;
    font-size: 1.2rem;
    text-align: right;
  }

  &__buttons {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
  }

  &__button {
    min-height: 60px;
    padding: 12px;
    border: 1px solid #d1d5db;
    border-radius: 5px;
    color: #111827;
    font-size: 1.2rem;
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

    &--equals {
      color: #ffffff;
      border-color: #2563eb;
      background: #2563eb;

      &:hover:not(:disabled) {
        background: #1d4ed8;
      }
    }

    &--clear {
      grid-column: 1 / -1;
      color: #991b1b;
      border-color: #fecaca;
      background: #fef2f2;

      &:hover:not(:disabled) {
        background: #fee2e2;
      }
    }
  }

  &__edit-status {
    margin: 12px 0 0;
    color: #1d4ed8;
    font-size: 0.9rem;
    font-weight: 600;
  }
}
</style>
