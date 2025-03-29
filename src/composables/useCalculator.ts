import { ref } from 'vue'
import { derivative } from 'mathjs'
import nerdamer from 'nerdamer'
import 'nerdamer/all'
import { KEYBOARD_ROWS } from '@/utils/constants'

export const useCalculator = () => {
  const expression = ref('')
  const result = ref('')
  const steps = ref<string[]>([])
  const variable = ref('x')
  const mode = ref<'derivar' | 'integrar'>('derivar')

const calculate = () => {
  steps.value = []
  try {
    const expr = nerdamer(expression.value).toString()
    steps.value.push(`Función original: ${expr}`)

    let yCalc
    if (mode.value === 'derivar') {
      steps.value.push('Aplicando la regla de derivación...')
      const stepResult = derivative(expr, variable.value).toString()
      steps.value.push(`Resultado derivado: ${stepResult}`)
      result.value = stepResult
      yCalc = nerdamer(stepResult).buildFunction([variable.value])
    } else {
      steps.value.push('Aplicando la integración...')
      const stepResult = nerdamer(`integrate(${expr}, ${variable.value})`).toString()
      steps.value.push(`Resultado integrado: ${stepResult} + C`)
      result.value = stepResult
      yCalc = nerdamer(stepResult).buildFunction([variable.value])
    }
  } catch (error) {
    result.value = 'Error en la expresión'
    steps.value = ['Verifica la función ingresada.']
    console.error('Error al calcular:', error)
  }
}

  const clearInput = () => {
    expression.value = ''
    result.value = ''
    steps.value = []
  }

  const deleteLastChar = () => {
    expression.value = expression.value.slice(0, -1)
  }

  const addToExpression = (key: string) => {
    expression.value += key
  }

  return {
    expression,
    result,
    steps,
    variable,
    mode,
    calculate,
    clearInput,
    deleteLastChar,
    addToExpression,
    keyboardRows: KEYBOARD_ROWS
  }
}
