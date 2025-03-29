<template>
  <div class="flex gap-2">
    <button
      @click="$emit('calculate')"
      class="w-full py-2 px-4 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-colors duration-200"
    >
      Calcular
    </button>
    <button
      @click="$emit('clear')"
      class="w-full py-2 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
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
    <button
      @click="$emit('delete-last-char')"
      class="w-full py-2 px-4 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors duration-200"
    >
      <span class="flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          class="mr-1">
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Borrar
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits(['calculate', 'clear', 'delete-last-char'])
</script>
