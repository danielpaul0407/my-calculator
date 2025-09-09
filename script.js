let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendToDisplay(value) {
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = '';
    currentInput = '';
    operator = '';
    previousInput = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value.replace(/×/g, '*');
        
        if (expression === '' || /[+\-*/]$/.test(expression)) {
            return;
        }
        
        let result = Function('"use strict"; return (' + expression + ')')();
        
        if (!isFinite(result)) {
            display.value = 'Error';
            return;
        }
        
        result = Math.round((result + Number.EPSILON) * 100000000) / 100000000;
        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-') {
        appendToDisplay(key);
    } else if (key === '*') {
        appendToDisplay('*');
    } else if (key === '/') {
        event.preventDefault();
        appendToDisplay('/');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});

display.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9+\-*/.]/g, '');
});