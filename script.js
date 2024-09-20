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

// Function to round long decimal results
function roundResult(result) {
    return Math.round(result * 100000) / 100000; // Round to 5 decimal places
}

// Function to handle digit button clicks
function handleDigitClick(digit) {
    if (waitingForSecondNumber) {
        displayValue = digit; // Start fresh for second number
        waitingForSecondNumber = false;
    } else {
        displayValue = displayValue === '0' ? digit : displayValue + digit; // Append digits
    }
    updateDisplay();
}

// Function to handle decimal button clicks
function handleDecimalClick() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
    updateDisplay();
}

// Function to handle operator button clicks
function handleOperatorClick(operator) {
    if (currentOperator && !waitingForSecondNumber) {
        // Evaluate the current operation before proceeding
        secondNumber = parseFloat(displayValue);
        const result = operate(currentOperator, firstNumber, secondNumber);
        displayValue = String(roundResult(result));
        updateDisplay();
        firstNumber = result;
    } else {
        firstNumber = parseFloat(displayValue);
    }

    currentOperator = operator;
    waitingForSecondNumber = true;
}

// Function to handle the equals button click
function handleEqualsClick() {
    if (!currentOperator || waitingForSecondNumber) return; // Prevent incomplete calculations

    secondNumber = parseFloat(displayValue);

    if (currentOperator === '/' && secondNumber === 0) {
        displayValue = "Error: Can't divide by 0!";
        updateDisplay();
        resetCalculator();
        return;
    }

    const result = operate(currentOperator, firstNumber, secondNumber);
    displayValue = String(roundResult(result));
    updateDisplay();

    firstNumber = result;
    currentOperator = null;
    waitingForSecondNumber = true;
}

// Function to handle the clear button
function handleClearClick() {
    displayValue = '0';
    firstNumber = null;
    secondNumber = null;
    currentOperator = null;
    waitingForSecondNumber = false;
    updateDisplay();
}

// Function to handle backspace
function handleBackspaceClick() {
    if (displayValue.length === 1 || (displayValue.length === 2 && displayValue[0] === '-')) {
        displayValue = '0';
    } else {
        displayValue = displayValue.slice(0, -1);
    }
    updateDisplay();
}

// Function to handle keyboard input
function handleKeyboardInput(event) {
    const key = event.key;

    if (!isNaN(key)) {
        handleDigitClick(key);
    } else if (key === '.') {
        handleDecimalClick();
    } else if (key === 'Backspace') {
        handleBackspaceClick();
    } else if (key === 'Enter' || key === '=') {
        handleEqualsClick();
    } else if (['+', '-', '*', '/'].includes(key)) {
        handleOperatorClick(key);
    } else if (key === 'Escape') {
        handleClearClick();
    }
}

// Event listeners for buttons
digitButtons.forEach(button => button.addEventListener('click', (e) => handleDigitClick(e.target.textContent)));
operatorButtons.forEach(button => button.addEventListener('click', (e) => handleOperatorClick(e.target.textContent)));
decimalButton.addEventListener('click', handleDecimalClick);
equalsButton.addEventListener('click', handleEqualsClick);
clearButton.addEventListener('click', handleClearClick);
backspaceButton.addEventListener('click', handleBackspaceClick);

// Keyboard support
window.addEventListener('keydown', handleKeyboardInput);

