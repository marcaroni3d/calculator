let firstOperand
let secondOperand
let operator

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

function operate(operator, firstOperand, secondOperand) {
    let result
    switch (operator) {
        case 'add':
            result = add(firstOperand, secondOperand)
            break
        case 'subtract':
            result = subtract(firstOperand, secondOperand)
            break
        case 'multiply':
            result = multiply(firstOperand, secondOperand)
            break
        case 'divide':
            result = divide(firstOperand, secondOperand)
            break
    }
    return result
}