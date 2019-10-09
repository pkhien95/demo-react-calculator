import React from 'react'
import {BUTTONS_LAYOUT} from "./constants";
import './styles.scss'
import {calculate, convertOperatorFromKey} from "./utils";

export interface CalculatorProps {
}

interface State {
  displayValue: string,
  operator: string | null,
  leftValue: string | null,
  waitingForRightValue: boolean
}

class Calculator extends React.Component<CalculatorProps, State> {

  constructor(props: CalculatorProps) {
    super(props)
    this.state = {
      displayValue: '0',
      operator: null,
      leftValue: null,
      waitingForRightValue: false
    }
  }

  updateState = (newState: any) => {
    this.setState({
      ...newState
    })
  }

  handleNumeric = (text: string) => {
    const {displayValue, operator, leftValue, waitingForRightValue: waitingForRightValueInState} = this.state as any
    let nextDisplayValue = displayValue
    let nextOperator = operator
    let nextLeftValue = leftValue
    let waitingForRightValue = waitingForRightValueInState

    if (waitingForRightValue) {
      nextDisplayValue = text
      waitingForRightValue = false
    } else {
      nextDisplayValue = displayValue === '0' ? text : displayValue + text
    }

    this.updateState({
      displayValue: nextDisplayValue,
      operator: nextOperator,
      leftValue: nextLeftValue,
      waitingForRightValue
    })
  }

  handleOperator = (text: string) => {
    const {displayValue, operator, leftValue, waitingForRightValue: waitingForRightValueInState} = this.state as any
    let nextDisplayValue = displayValue
    let nextOperator = operator
    let nextLeftValue = leftValue
    let waitingForRightValue = waitingForRightValueInState

    if (operator && waitingForRightValueInState) {
      nextOperator = text
    } else {
      if (!leftValue) {
        nextLeftValue = displayValue
      } else if (operator) {
        nextDisplayValue = calculate(leftValue || '0', displayValue, operator)
        nextLeftValue = nextDisplayValue
      }
      nextOperator = text
      waitingForRightValue = true
    }
    this.updateState({
      displayValue: nextDisplayValue,
      operator: nextOperator,
      leftValue: nextLeftValue,
      waitingForRightValue
    })
  }

  handleEqualButton = () => {
    const {displayValue, operator, leftValue, waitingForRightValue: waitingForRightValueInState} = this.state as any
    let nextDisplayValue = displayValue
    let nextOperator = operator
    let nextLeftValue = leftValue
    let waitingForRightValue = waitingForRightValueInState

    if (operator) {
      nextDisplayValue = calculate(leftValue, displayValue, operator)
      nextLeftValue = nextDisplayValue
      waitingForRightValue = true
      nextOperator = null
    }
    this.updateState({
      displayValue: nextDisplayValue,
      operator: nextOperator,
      leftValue: nextLeftValue,
      waitingForRightValue
    })
  }

  handleClearButton = () => {
    this.updateState({
      displayValue: '0',
      operator: null,
      leftValue: null,
      waitingForRightValue: false
    })
  }

  onButtonClick = (text: any) => {
    if (text === 'clear') {
      this.handleClearButton()
    } else if (text === '=') {
      this.handleEqualButton()
    } else if (isNaN(text)) {
      this.handleOperator(text)
    } else {
      this.handleNumeric(text)
    }
  }

  onKeyDown = (event: any) => {
    const {key} = event
    console.log(key)
    const allowedKeys = ['+', '-', '*', '/', '=', 'Backspace', 'Delete', 'Enter', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (key && allowedKeys.includes(key)) {
      const convertedOperatorFromKey = convertOperatorFromKey(key)
      this.onButtonClick(convertedOperatorFromKey)
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  render() {
    const {displayValue} = this.state

    return (
      <div className={'container'}>
        <table className={'calculator-container'}>
          <tbody>
          <tr className={'input-row'}>
            <td colSpan={4}>
              <span id={'display-span'}>{displayValue}</span>
            </td>
          </tr>
          {
            BUTTONS_LAYOUT.map((row, index) => (
              <tr key={index.toString()}>
                {
                  row.map(({text, colspan, style}) => (
                    <td key={text} test-id={`button-${text}`} className={style} colSpan={colspan}
                        onClick={() => this.onButtonClick(text)}>
                      <span>{text}</span>
                    </td>
                  ))
                }
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    )
  }
}

export default Calculator