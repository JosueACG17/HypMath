<template>
  <div class="flex flex-col md:flex-row bg-gradient-to-br from-indigo-50 to-white">
    <!-- Left Panel -->
    <div class="w-full md:w-1/2 p-4 md:p-6 flex flex-col">
      <CalculatorHeader />
      <TabButtons v-model:activeTab="activeTab" />

      <CalculatorInput
        v-if="activeTab === 'calculator'"
        v-model:expression="expression"
        v-model:mode="mode"
        v-model:variable="variable"
        :keyboard-rows="keyboardRows"
        @calculate="handleCalculate"
        @clear="enhancedClearInput"
        @delete-last-char="deleteLastChar"
      />

      <HistoryPanel
        v-if="activeTab === 'history'"
        :items="historyItems"
        @load-from-history="loadFromHistory"
        @clear-history="handleClearHistory"
      />
    </div>

    <!-- Right Panel -->
    <div class="w-full md:w-1/2 p-4 md:p-6 flex flex-col">
      <FunctionChart
        :expression="expression"
        :mode="mode"
        :variable="variable"
        :result="result"
      />

      <ResultPanel
        :result="result"
        :steps="steps"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { KEYBOARD_ROWS } from '@/utils/constants'
import CalculatorHeader from './CalculatorHeader.vue'
import TabButtons from './TabButtons.vue'
import CalculatorInput from './CalculatorInput.vue'
import HistoryPanel from '../History/HistoryPanel.vue'
import FunctionChart from '../Chart/FunctionChart.vue'
import ResultPanel from '../Result/ResultPanel.vue'
import { useCalculator } from '@/composables/useCalculator'
import { useHistory } from '@/composables/useHistory'

const activeTab = ref<'calculator' | 'history'>('calculator')
const keyboardRows = KEYBOARD_ROWS

const {
  expression,
  mode,
  variable,
  result,
  steps,
  calculate,
  clearInput,
  deleteLastChar
} = useCalculator()

const {
  historyItems,
  loadFromHistory,
  saveToHistory,
  clearHistory
} = useHistory()

const handleCalculate = () => {
  calculate()
  if (expression?.value?.trim()) {
    saveToHistory({
      expression: expression?.value || '',
      mode: mode?.value || 'derivar',
      variable: variable?.value || 'x',
      result: result?.value || ''
    })
  }
}

const handleClearHistory = () => {
  clearHistory()
}

const enhancedClearInput = () => {
  clearInput()
}
</script>
