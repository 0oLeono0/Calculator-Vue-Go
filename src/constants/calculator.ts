export const CALCULATOR_BUTTONS = [
  '7',
  '8',
  '9',
  '/',
  '4',
  '5',
  '6',
  '*',
  '1',
  '2',
  '3',
  '-',
  '0',
  '.',
  '=',
  '+',
  'C',
] as const

export type CalculatorButton = (typeof CALCULATOR_BUTTONS)[number]
