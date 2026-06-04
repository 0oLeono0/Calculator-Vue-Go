<script setup lang="ts">
import { onMounted } from 'vue'

import CalculationHistory from '@/components/CalculationHistory.vue'
import CalculatorPanel from '@/components/CalculatorPanel.vue'
import { useCalculatorStore } from '@/stores/calculator'

defineOptions({
  name: 'CalculatorApp',
})

const calculatorStore = useCalculatorStore()

onMounted(() => {
  void calculatorStore.loadHistory()
})
</script>

<template>
  <main class="app-shell">
    <h1 class="app-shell__title">Calculator</h1>

    <CalculatorPanel />
    <CalculationHistory />
  </main>
</template>

<style scoped lang="scss">
.app-shell {
  width: min(100% - 32px, 640px);
  margin: 24px auto;
  text-align: center;

  &__title {
    margin: 0 0 20px;
    color: #111827;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1.2;
  }
}
</style>
