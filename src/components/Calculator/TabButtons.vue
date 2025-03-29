<template>
  <div class="w-full mb-6">
    <div class="grid w-full grid-cols-2">
      <button
        @click="$emit('update:activeTab', 'calculator')"
        class="px-3 py-2 text-sm rounded-tl-md rounded-tr-none"
        :class="activeTab === 'calculator' ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'bg-gray-100 text-gray-500'"
      >
        Calculadora
      </button>
      <button
        @click="$emit('update:activeTab', 'history')"
        class="px-3 py-2 text-sm rounded-tr-md rounded-tl-none"
        :class="activeTab === 'history' ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'bg-gray-100 text-gray-500'"
      >
        Historial
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeTab: 'calculator' | 'history'
}>()

defineEmits(['update:activeTab'])
</script>
