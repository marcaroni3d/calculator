// VARIABLES
let firstOperand
let secondOperand
let currentOperation
let shouldResetScreen = false

const previousDisplay = document.getElementById('previous-display')
const currentDisplay = document.getElementById('current-display')
const clearButton = document.getElementById('clear-btn')
const deleteButton = document.getElementById('delete-btn')
const numberButtons = document.querySelectorAll('.number-btn')
const operatorButtons = document.querySelectorAll('.operator-btn')
const equalsButton = document.getElementById('equals-btn')
const decimalButton = document.getElementById('decimal-btn')

// EVENT LISTENERS
clearButton.onclick = () => clear()
deleteButton.onclick = () => removeNumber()
decimalButton.onclick = () => addDecimal()
equalsButton.onclick = () => evaluate()

numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent)) 
})
operatorButtons.forEach(button => {
    button.addEventListener('click', () => setOperator(button.textContent))
})

// FUNCTIONS
function clear() {
    currentDisplay.textContent = '0'
    previousDisplay.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
}

function resetScreen() {
    currentDisplay.textContent = ''
    shouldResetScreen = false
}

function removeNumber() {
    if (/\s$/.test(currentDisplay.textContent)) {
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -3)
    } else {
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -1)
    }
}

function appendNumber(number) {
    if (currentDisplay.textContent === '0' || shouldResetScreen) {
        resetScreen()
    }
    if (currentDisplay.textContent.length < 10) {
        currentDisplay.textContent += number
    }
}

function addDecimal() {
    if (currentDisplay.textContent === '' || shouldResetScreen) {
        currentDisplay.textContent = '0'
    }
    if (currentDisplay.textContent.includes('.')) return
    currentDisplay.textContent += '.'
}

function setOperator(input) {
    currentOperation = input
    firstOperand = currentDisplay.textContent
    if (firstOperand == '') {
        firstOperand = 0 
    }
    previousDisplay.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === '%' && currentDisplay.textContent === '0') {
        alert("You can't divide by zero!")
        return
    }
    secondOperand = currentDisplay.textContent
    currentDisplay.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    )
    previousDisplay.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

// KEYBOARD FUNCTIONALITY
document.addEventListener('keydown', (e) => {
    console.log(e.key)
    if (e.key === 0 || e.key >= 1 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') addDecimal()
    if (e.key === 'Backspace') removeNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === '+' || e.key === '-' || e.key === 'x' || e.key === '*' || e.key === '/' || e.key === '%') {
        setOperator(convertOperator(e.key))
    }
})

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '+') return '+'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === 'x' || keyboardOperator === '*') return 'x'
    if (keyboardOperator === '/' || keyboardOperator === '%') return '%'
}


// CORE ARITHMETIC
function add(a, b) {
    return (a + b)
}
function subtract(a, b) {
    return (a - b)
}
function multiply(a, b) {
    return (a * b)
}
function divide(a, b) {
    return (a / b)
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    let result
    switch (operator) {
        case '+':
            result = add(a, b)
            break
        case '-':
            result = subtract(a, b)
            break
        case 'x':
            result = multiply(a, b)
            break
        case '%':
            result = divide(a, b)
            break
    }
    return result
}