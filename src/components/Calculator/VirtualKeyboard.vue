<template>
  <div class="border-0 shadow-md bg-white rounded-lg">
    <div class="p-4">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-lg font-semibold text-gray-800">Teclado Virtual</h2>
      </div>
      <div class="grid gap-2">
        <div v-for="(row, rowIndex) in KEYBOARD_ROWS" :key="rowIndex" class="grid grid-cols-5 gap-2">
          <button
            v-for="(key, keyIndex) in row"
            :key="`${rowIndex}-${keyIndex}`"
            @click="key && $emit('key-press', key)"
            :class="[
              'h-10 font-mono py-2 px-4 rounded-md transition-colors duration-200',
              key === '' ? 'invisible' : '',
              ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'ln', 'log', 'sqrt', 'abs'].includes(key)
                ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                : ['(', ')', '^', '+', '-', '*', '/'].includes(key)
                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-300'
            ]"
          >
            {{ key }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { KEYBOARD_ROWS } from '@/utils/constants'

defineProps<{
  keyboardRows: string[][]
}>()

defineEmits(['key-press'])
</script>
