const calculator = document.querySelector('.calculator')
const inputs = calculator.querySelector('.inputs')
const results = document.querySelector('.display-result')
const displayinputs = document.querySelector('.display-inputs')

const calculate = (n1, operator, n2) => {
      let result = ''

	  if (operator === 'add') {
	    result = parseFloat(n1) + parseFloat(n2)
	  } else if (operator === 'subtract') {
	    result = parseFloat(n1) - parseFloat(n2)
	  } else if (operator === 'multiply') {
	    result = parseFloat(n1) * parseFloat(n2)
	  } else if (operator === 'divide') {
	    result = parseFloat(n1) / parseFloat(n2)
	  }

	  return result
}

inputs.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target
    const action = key.dataset.action
    const keyValue = key.textContent
    const displayedNum = results.textContent
    const displayedInputs = displayinputs.textContent
    const lastKey = calculator.dataset.lastKey

   displayinputs.textContent = displayedNum + keyValue

    if (!action) {
      if (
        displayedNum === '0' || lastKey === 'operator' || lastKey === 'calculate'
      ) {
        results.textContent = keyValue
        displayinputs.textContent = keyValue
      } else {
        results.textContent = displayedNum + keyValue

      }
      calculator.dataset.lastKey = 'number'
    }

    if (action === 'save'){

    }

    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        results.textContent = displayedNum + '.'
      } else if (
        lastKey === 'operator' || lastKey === 'calculate'
      ) {
        results.textContent = '0.'
      }

      calculator.dataset.previousKeyType = 'decimal'
    }

    if (
      action === 'add' ||  action === 'subtract' || action === 'multiply' || action === 'divide'
    ) {
      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      if (
        firstValue &&
        operator &&
        lastKey !== 'operator' &&
        lastKey !== 'calculate'
      ) {
        const calcValue = calculate(firstValue, operator, secondValue)
        results.textContent = calcValue
        displayinputs.textContent = calcValue
        calculator.dataset.firstValue = calcValue
      } else {
        calculator.dataset.firstValue = displayedNum
      }

      calculator.dataset.lastKey = 'operator'
      calculator.dataset.operator = action
    }

    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.lastKey = ''
      } else {
        key.textContent = 'AC'
      }

      results.textContent = 0
      displayinputs.textContent = 0
      calculator.dataset.lastKey = 'clear'
    }

    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
    }

    if (action === 'calculate') {
      let firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      let secondValue = displayedNum

      if (firstValue) {
        if (lastKey === 'calculate') {
          firstValue = displayedNum
          secondValue = calculator.dataset.modValue
        }

        results.textContent = calculate(firstValue, operator, secondValue)
      }

      calculator.dataset.modValue = secondValue
      calculator.dataset.lastKey = 'calculate'
    }
  }
})
