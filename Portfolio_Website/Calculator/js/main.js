const Calculator = {
    displayValue: '0',
    firstOperand: null,
    waitOperand: false,
    operator: null,
};

function inputDigit (digit) {
    const {displayValue, waitOperand} = Calculator

    if (waitOperand === true) {
        Calculator.displayValue = digit;
        Calculator.waitOperand = false;
    }

    else {
        Calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal (dot) {
    if (Calculator.waitOperand === true) return;
    if (!Calculator.displayValue.includes(dot)) {
        Calculator.displayValue += dot;
    }
}

function handleOperator (nextOp) {
    const { firstOperand, displayValue, operator} = Calculator;
    const inputValue = parseFloat (displayValue);

    if (operator && Calculator.waitOperand) {
        Calculator.operator = nextOp;
        return;
    }
    if (firstOperand == null) {
        Calculator.firstOperand = inputValue
    }

    else if (operator) {
        const nowValue = firstOperand || 0

        let result = calculate[operator] (nowValue, inputValue);

        result = Number(result).toFixed(9);
        result = (result*1).toString();
        Calculator.displayValue = parseFloat (result);
        Calculator.firstOperand = parseFloat (result);
    }

    Calculator.waitOperand = true;
    Calculator.operator = nextOp;
}


const calculate = {
    '/': (firstOperand, waitOperand) => firstOperand / waitOperand,
    '*': (firstOperand, waitOperand) => firstOperand * waitOperand,
    '+': (firstOperand, waitOperand) => firstOperand + waitOperand,
    '-': (firstOperand, waitOperand) => firstOperand - waitOperand,
    '=': (firstOperand, waitOperand) => waitOperand,
};

function resetCalc () {
    Calculator.displayValue = '0';
    Calculator.firstOperand = null;
    Calculator.waitOperand = false;
    Calculator.operator = null;
}

function updateDisplay () {
    const display=document.querySelector('.calculator-screen');
    display.value=Calculator.displayValue;
}

updateDisplay ();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const {target} = event;

    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay ();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalc ();
        updateDisplay ();
        return;
    }

    inputDigit(target.value);
    updateDisplay ();
})