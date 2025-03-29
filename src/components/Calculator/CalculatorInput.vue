<template>
  <div class="space-y-4">
    <div class="border-0 shadow-md bg-white rounded-lg">
      <div class="p-4">
        <div class="space-y-4">
          <div>
            <label for="expression" class="text-sm font-medium text-gray-700 mb-1 block">
              Función
            </label>
            <input
              id="expression"
              :value="expression"
              @input="$emit('update:expression', $event.target.value)"
              placeholder="Ej: x^2 + sin x"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-lg"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="mode" class="text-sm font-medium text-gray-700 mb-1 block">
                Operación
              </label>
              <select
                id="mode"
                :value="mode"
                @change="$emit('update:mode', $event.target.value)"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="derivar">Derivar</option>
                <option value="integrar">Integrar</option>
              </select>
            </div>
            <div>
              <label for="variable" class="text-sm font-medium text-gray-700 mb-1 block">
                Variable
              </label>
              <select
                id="variable"
                :value="variable"
                @change="$emit('update:variable', $event.target.value)"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="x">x</option>
                <option value="y">y</option>
                <option value="z">z</option>
              </select>
            </div>
          </div>

          <CalculatorActions
            @calculate="$emit('calculate')"
            @clear="$emit('clear')"
            @delete-last-char="$emit('delete-last-char')"
          />
        </div>
      </div>
    </div>

    <VirtualKeyboard
      :keyboard-rows="KEYBOARD_ROWS"
      @key-press="addToExpression"
    />
  </div>
</template>

<script setup lang="ts">
import { KEYBOARD_ROWS } from '@/utils/constants'
import VirtualKeyboard from './VirtualKeyboard.vue'
import CalculatorActions from './CalculatorActions.vue'

const props = defineProps<{
  expression: string
  mode: 'derivar' | 'integrar'
  variable: string
}>()

const emit = defineEmits([
  'update:expression',
  'update:mode',
  'update:variable',
  'calculate',
  'clear',
  'delete-last-char'
])

const addToExpression = (key: string) => {
  emit('update:expression', props.expression + key)
}
</script>
