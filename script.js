function add(a, b) {
    return (a + b)
};

function subtract(a, b) {
    return (a - b)
};

function multiply(a, b) {
    return (a * b)
};

function divide(a, b) {
    return (a / b)
};

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case 'x':
            return multiply(a, b)
        case '÷':
            if (a === 0 || b === 0) return null
            else return divide(a, b)
        default:
            return null
    }
}

const lastOperationScreen = document.querySelector('.last-operation-screen')
const currentOperationScreen = document.querySelector('.current-operation-screen')
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = [...document.querySelectorAll('[data-operator]')]
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('deleteBtn')
const pointButton = document.getElementById('pointBtn')
const equalsButton = document.getElementById('equalsBtn')

window.addEventListener('keydown', keyboardSupport)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)
equalsButton.addEventListener('click', evaluate)

const defaultDisplay = '0'
const defaultOperation = null

currentOperationScreen.textContent = defaultDisplay
let currentOperation = defaultOperation
let firstOperand = ''
let secondOperand = ''
let shouldResetScreen = false

function clear() {
    currentOperationScreen.textContent = defaultDisplay
    lastOperationScreen.textContent = ''
    currentOperation = defaultOperation
    firstOperand = ''
    secondOperand = ''
}

numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)
operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen)
        resetScreen()
    currentOperationScreen.textContent += number
}

function resetScreen() {
    currentOperationScreen.textContent = ''
    shouldResetScreen = false
}

function setOperation(operator) {
    firstOperand = parseFloat(currentOperationScreen.textContent)
    currentOperation = operator
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    secondOperand = parseFloat(currentOperationScreen.textContent)
    currentOperationScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    )
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent
        .toString()
        .slice(0, -1)
}

function appendPoint() {
    if (shouldResetScreen) resetScreen()
    if (currentOperationScreen.textContent === '')
        currentOperationScreen.textContent = '0'
    if (currentOperationScreen.textContent.includes('.')) return
    currentOperationScreen.textContent += '.'
}

function keyboardSupport(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*' || e.key === 'x')
        setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '+') return '+'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return 'x'
    if (keyboardOperator === 'x') return 'x'
}
