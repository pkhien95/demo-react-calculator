export const calculate = (prevValue: string, nextValue: string, operator: string) => {
  const parsedPrevValue = parseInt(prevValue)
  const parsedNextValue = parseInt(nextValue)
  let result = 0
  switch (operator) {
    case '+':
      result = parsedPrevValue + parsedNextValue
      break
    case '-':
      result = Math.max(0, parsedPrevValue - parsedNextValue);
      break
    case '×':
      result = parsedPrevValue * parsedNextValue
      break
    case '÷':
      result = parsedPrevValue / parsedNextValue
      break
  }
  return result.toString()
}

export const convertOperatorFromKey = (key: string) => {
  switch (key) {
    case '/':
      return '÷'
    case '*':
      return '×'
    case 'Backspace':
    case 'Delete':
      return 'clear'
    case 'Enter':
      return '='
    default:
      return key
  }
}