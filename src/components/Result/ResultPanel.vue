<template>
  <div class="border-0 shadow-md bg-white rounded-lg">
    <div class="p-4">
      <h2 class="text-lg font-semibold text-gray-800 mb-2">Resultado</h2>
      <div class="bg-gray-50 p-3 rounded-md font-mono text-lg mb-4">
        {{ mode === 'integrar' && result && !result.includes('Error') ? result + ' + C' : result || "Esperando cálculo..." }}
      </div>

      <h3 class="text-md font-semibold text-gray-700 mb-2">Pasos:</h3>
      <ul v-if="steps.length > 0" class="space-y-2">
        <li v-for="(step, index) in steps" :key="index" class="text-gray-600 text-sm bg-gray-50 p-2 rounded">
          {{ step }}
        </li>
      </ul>
      <p v-else class="text-gray-500 text-sm">Realiza un cálculo para ver los pasos.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  result: string
  steps: string[]
  mode?: 'derivar' | 'integrar'  
}>()
</script>
