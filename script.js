const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // If current display value is 0, replace it, otherwise add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    // If operator pressed, don't add decimal
    if (awaitingNextValue)
        return;
    // If no decimal, add decimal
    if (!calculatorDisplay.textContent.includes('.'))
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
}

const calculate = {
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    if (!firstValue)
        firstValue = currentValue;
    else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value, store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

// Reset
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Event Listeners
clearBtn.addEventListener('click', resetAll);
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0)
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    else if (inputBtn.classList.contains('operator'))
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    else if (inputBtn.classList.contains('decimal'))
        inputBtn.addEventListener('click', () => addDecimal());
});