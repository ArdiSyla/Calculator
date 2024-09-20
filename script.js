function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero";
    }
    return a / b;
}

function operate(operator, firstNumber, secondNumber) {
    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
        default:
            return "Invalid operator";
    }
}

let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let displayValue = '0';
let waitingForSecondNumber = false;

const display = document.querySelector('.calculator-screen');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('.decimal');
const equalsButton = document.querySelector('.equal-sign');
const clearButton = document.querySelector('.clear');
const backspaceButton = document.querySelector('.backspace');

function updateDisplay() {
    display.textContent = displayValue;
}

