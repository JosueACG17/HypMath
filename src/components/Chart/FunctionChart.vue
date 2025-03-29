<template>
  <div class="flex-1 border-0 shadow-md bg-white rounded-lg mb-4">
    <div class="p-4 h-full flex flex-col">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Gráfica</h2>
      <div class="flex-1 min-h-[200px]">
        <LineChart :chart-data="chartData" :options="chartOptions" class="h-full w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { computed } from 'vue'
import nerdamer from 'nerdamer'
import 'nerdamer/all'

Chart.register(...registerables)

const props = defineProps<{
  expression: string
  mode: 'derivar' | 'integrar'
  variable: string
  result: string
}>()

const xValues = Array.from({ length: 100 }, (_, i) => (i - 50) / 10)

const yValues = computed(() => {
  if (!props.result || props.result.includes('Error')) return []

  try {
    const cleanResult = props.result.replace(/\s*\+\s*C\s*$/, '')
    const yCalc = nerdamer(cleanResult).buildFunction([props.variable])

    return xValues.map((x) => {
      try {
        const y = yCalc(x)
        return isFinite(y) && Math.abs(y) < 1000 ? y : null
      } catch {
        return null
      }
    })
  } catch {
    return []
  }
})

const chartData = computed(() => ({
  labels: xValues.map(x => x.toFixed(1)),
  datasets: [{
    label: props.expression
      ? `${props.mode === 'derivar' ? 'Derivada' : 'Integral'} de ${props.expression}`
      : 'Gráfica',
    data: yValues.value.length > 0 ? yValues.value : [],
    borderColor: 'rgb(99, 102, 241)',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    tension: 0.4,
    fill: props.mode === 'integrar' 
  }]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          size: 14
        }
      }
    }
  },
  scales: {
    x: {
      grid: { color: 'rgba(0, 0, 0, 0.05)' },
      title: {
        display: true,
        text: props.variable || 'x'
      }
    },
    y: {
      grid: { color: 'rgba(0, 0, 0, 0.05)' },
      title: {
        display: true,
        text: 'f(' + (props.variable || 'x') + ')'
      }
    }
  }
}
</script>
