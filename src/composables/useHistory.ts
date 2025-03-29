import { ref } from 'vue'
import type { HistoryItem } from '@/interface/History'

export const useHistory = () => {
  const historyItems = ref<HistoryItem[]>([])

  const loadHistory = () => {
    const savedHistory = localStorage.getItem('calculatorHistory')
    if (savedHistory) {
      historyItems.value = JSON.parse(savedHistory)
    }
  }

  const saveToHistory = (item: Omit<HistoryItem, 'timestamp'>) => {
    const newItem: HistoryItem = {
      expression: item.expression,
      mode: item.mode,
      variable: item.variable,
      result: item.result || '',
      timestamp: Date.now()
    }

    const updatedHistory = [newItem, ...historyItems.value].slice(0, 8)
    historyItems.value = updatedHistory
    localStorage.setItem('calculatorHistory', JSON.stringify(updatedHistory))
  }

  const clearHistory = () => {
    historyItems.value = []
    localStorage.removeItem('calculatorHistory')
  }

  const loadFromHistory = (item: HistoryItem) => {
    return {
      expression: item.expression,
      mode: item.mode,
      variable: item.variable
    }
  }

  loadHistory()

  return {
    historyItems,
    saveToHistory,
    loadFromHistory,
    clearHistory
  }
}
