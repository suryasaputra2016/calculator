let firstNumber = '';
let secondNumber = '';
let operator = '+';

// we have five modes: firstNumber, operation, secondNumber, equality, error
let mode = 'firstNumber';

let display = document.querySelector('.display');

let numbers = document.querySelectorAll('.number');
numbers.forEach(function(number) {
    number.addEventListener('click', function(event) {
        switch(mode) {
            case 'firstNumber':
                firstNumber += event.target.value;
                display.textContent = firstNumber;
                break;
            case 'operation':
                mode = 'secondNumber';
                secondNumber += event.target.value;
                display.textContent = secondNumber;
                break;
            case 'secondNumber':
                secondNumber += event.target.value;
                display.textContent = secondNumber;
                break;
            case 'equality':
            case 'error':
                firstNumber = event.target.value;
                display.textContent = firstNumber;
                mode = 'firstNumber';
        }
    });
});

let operations = document.querySelectorAll('.operation');
operations.forEach(function(operation) {
    operation.addEventListener('click', function(event) {
        
        switch(mode) {
            case 'firstNumber':
            case 'equality':
                mode = 'operation';
                break;
            case 'secondNumber':
                firstNumber = String(operate(firstNumber,secondNumber, operator));
                if(firstNumber.length > 9 && firstNumber.includes('.')) {
                    firstNumber = firstNumber.slice(0,9);
                }
                secondNumber = '';
                display.textContent = firstNumber;
                mode = isNaN(firstNumber) ? 'error' :'secondNumber';
                break;
            case 'operation':
            case 'error':
        }
        operator = event.target.value;
    });
});

let equal = document.querySelector('.equal');
equal.addEventListener('click', function(event) {
    switch(mode) {
        case 'firstNumber':
            mode = 'equality'
            break;
        case 'operation':
            firstNumber = String(operate(firstNumber, firstNumber, operator));
            if(firstNumber.length > 9 && firstNumber.includes('.')) {
                firstNumber = firstNumber.slice(0,9);
            }
            mode = isNaN(firstNumber) ? 'error' :'equality';
            secondNumber = '';
            display.textContent = firstNumber;
            break;
        case 'secondNumber':
            firstNumber = String(operate(firstNumber, secondNumber, operator));
            console.log('hello');
            if(firstNumber.length > 9 && firstNumber.includes('.')) {
                firstNumber = firstNumber.slice(0,9);
            }
            mode = isNaN(firstNumber) ? 'error' :'equality';
            secondNumber = '';
            display.textContent = firstNumber;
            break;
        case 'equality':
        case 'error':
    }
});

let clear = document.querySelector('.clear');
clear.addEventListener('click', function() {
    firstNumber = '';
    secondNumber = '';
    display.textContent = firstNumber;
    mode = 'firstNumber'
})

function operate(num1, num2, operation) {
    switch(operation) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num2==='0' ? 'Math Error' : num1 / num2;
}

