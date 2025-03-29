import nerdamer from 'nerdamer'
import 'nerdamer/all'
import { derivative } from 'mathjs'

export const calculateDerivative = (expression: string, variable: string) => {
  const expr = nerdamer(expression).toString()
  const result = derivative(expr, variable).toString()
  return {
    result,
    steps: [
      `Función original: ${expr}`,
      'Aplicando la regla de derivación...',
      `Resultado derivado: ${result}`
    ]
  }
}

export const calculateIntegral = (expression: string, variable: string) => {
  const expr = nerdamer(expression).toString()
  const result = nerdamer(`integrate(${expr}, ${variable})`).toString()
  return {
    result: result + ' + C',
    steps: [
      `Función original: ${expr}`,
      'Aplicando la integración...',
      `Resultado integrado: ${result} + C`
    ]
  }
}
