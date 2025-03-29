<template>
  <div class="space-y-4">
    <div class="border-0 shadow-md bg-white rounded-lg">
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Historial de Cálculos</h2>
          <button
            v-if="items.length > 0"
            @click="$emit('clear-history')"
            class="text-white hover:bg-red-700 text-sm font-medium transition-colors p-2 bg-red-500 rounded-md shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
          <span class="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="mr-1">
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
        Limpiar
      </span>
          </button>
        </div>
        <div v-if="items.length > 0" class="space-y-3">
          <div
            v-for="(item, index) in items"
            :key="index"
            @click="$emit('load-from-history', item)"
            class="p-3 border border-gray-200 rounded-md hover:bg-indigo-50 cursor-pointer transition-colors"
          >
            <div class="flex justify-between items-start">
              <div>
                <p class="font-medium text-gray-800">{{ item.expression }}</p>
                <p class="text-xs text-gray-500 mt-1">
                  {{ item.mode === 'derivar' ? 'Derivada' : 'Integral' }} respecto a {{ item.variable }}
                </p>
              </div>
              <span class="text-xs text-gray-400">{{ formatDate(item.timestamp) }}</span>
            </div>
          </div>
        </div>
        <p v-else class="text-gray-500 text-sm">No hay cálculos recientes.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HistoryItem } from '@/interface/History'

defineProps<{
  items: HistoryItem[]
}>()

defineEmits(['load-from-history', 'clear-history'])

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleTimeString()
}
</script>
