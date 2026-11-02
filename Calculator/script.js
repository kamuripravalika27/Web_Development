/**
 * Modern Interactive Calculator
 * Built using HTML5, CSS Grid, and Vanilla JavaScript
 * Demonstrates: Loops, Event Listeners, If-Else Statements, and Mathematical Operators
 */

// ====================================================================
// 1. DOM Elements Selection
// ====================================================================
const previousOperandElement = document.getElementById('previous-operand');
const currentOperandElement = document.getElementById('current-operand');
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('.theme-icon');
const buttons = document.querySelectorAll('.btn');

// ====================================================================
// 2. Calculator State
// ====================================================================
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

// ====================================================================
// 3. Calculator Core Functions
// ====================================================================

/**
 * Resets the calculator state to initial values.
 */
function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
  shouldResetScreen = false;
  updateDisplay();
}

/**
 * Deletes the last entered character from the current operand.
 */
function deleteLastDigit() {
  if (shouldResetScreen) {
    clearAll();
    return;
  }

  // If there's only one digit or error text, reset to '0'
  if (currentOperand.length === 1 || currentOperand === 'Error' || currentOperand === 'Cannot divide by 0') {
    currentOperand = '0';
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
}

/**
 * Appends a number or decimal point to the current operand.
 * @param {string} number - The digit or decimal string to append
 */
function appendNumber(number) {
  // If calculation just completed or screen needs reset, start fresh
  if (shouldResetScreen || currentOperand === 'Error' || currentOperand === 'Cannot divide by 0') {
    currentOperand = '';
    shouldResetScreen = false;
  }

  // Prevent multiple decimal points
  if (number === '.') {
    if (currentOperand.includes('.')) {
      return; // If decimal already exists, ignore input
    }
    if (currentOperand === '' || currentOperand === '0') {
      currentOperand = '0.';
      updateDisplay();
      return;
    }
  }

  // Replace initial '0' with the new number unless it's a decimal
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number;
  } else {
    // Append the digit
    currentOperand += number;
  }

  updateDisplay();
}

/**
 * Sets the mathematical operation and computes intermediate results if needed.
 * @param {string} selectedOperation - Mathematical operator symbol (+, −, ×, ÷)
 */
function chooseOperation(selectedOperation) {
  if (currentOperand === 'Error' || currentOperand === 'Cannot divide by 0') {
    return;
  }

  // If previous operand and operation already exist and user didn't just pick an operator, calculate first
  if (previousOperand !== '' && operation !== undefined && !shouldResetScreen) {
    calculate();
  }

  operation = selectedOperation;
  previousOperand = currentOperand;
  shouldResetScreen = true;
  updateDisplay();
}

/**
 * Toggles the sign of the current operand (+/-) using negation operator.
 */
function toggleSign() {
  if (currentOperand === '0' || currentOperand === 'Error' || currentOperand === 'Cannot divide by 0') {
    return;
  }

  // Using the negation operator and conditional statement
  if (currentOperand.startsWith('-')) {
    currentOperand = currentOperand.slice(1);
  } else {
    currentOperand = '-' + currentOperand;
  }
  updateDisplay();
}

/**
 * Calculates percentage of current value using division operator.
 */
function calculatePercentage() {
  const currentNum = parseFloat(currentOperand);
  if (isNaN(currentNum)) return;

  // If there's an active context like "100 + 10%", compute 10% of 100
  if (previousOperand !== '' && (operation === '+' || operation === '−')) {
    const prevNum = parseFloat(previousOperand);
    const percentValue = (prevNum * currentNum) / 100;
    currentOperand = formatResult(percentValue);
  } else {
    // Standard percentage: value / 100
    const result = currentNum / 100;
    currentOperand = formatResult(result);
  }
  
  updateDisplay();
}

/**
 * Executes the arithmetic calculation based on the selected operator.
 * Demonstrates: if-else statements and arithmetic operators (+, -, *, /)
 */
function calculate() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  // If either number is not valid, abort calculation
  if (isNaN(prev) || isNaN(current)) {
    return;
  }

  // Conditional Logic (If-Else Statements) to perform operations
  if (operation === '+') {
    computation = prev + current;
  } else if (operation === '−' || operation === '-') {
    computation = prev - current;
  } else if (operation === '×' || operation === '*' || operation === 'x') {
    computation = prev * current;
  } else if (operation === '÷' || operation === '/') {
    // Handle division by zero edge case
    if (current === 0) {
      currentOperand = 'Cannot divide by 0';
      previousOperand = '';
      operation = undefined;
      shouldResetScreen = true;
      updateDisplay();
      return;
    } else {
      computation = prev / current;
    }
  } else {
    // If no valid operator is matched, exit
    return;
  }

  // Format result to prevent floating point inaccuracies like 0.1 + 0.2
  currentOperand = formatResult(computation);
  operation = undefined;
  previousOperand = '';
  shouldResetScreen = true;
  updateDisplay();
}

/**
 * Formats calculation result to eliminate floating point glitches and avoid excessive decimals.
 * @param {number} num 
 * @returns {string}
 */
function formatResult(num) {
  // Round to max 10 decimal places to fix binary float precision issues
  const rounded = Math.round((num + Number.EPSILON) * 1e10) / 1e10;
  return rounded.toString();
}

/**
 * Formats numbers for display with comma thousand separators while preserving decimals.
 * @param {string} numberStr 
 * @returns {string}
 */
function getDisplayNumber(numberStr) {
  if (numberStr === 'Cannot divide by 0' || numberStr === 'Error') {
    return numberStr;
  }

  const stringVal = numberStr.toString();
  const integerDigits = parseFloat(stringVal.split('.')[0]);
  const decimalDigits = stringVal.split('.')[1];
  let integerDisplay;

  if (isNaN(integerDigits)) {
    integerDisplay = '';
  } else {
    integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
  }

  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

/**
 * Updates both the previous expression and current operand display screens.
 */
function updateDisplay() {
  if (currentOperand === 'Cannot divide by 0' || currentOperand === 'Error') {
    currentOperandElement.innerText = currentOperand;
    currentOperandElement.style.fontSize = '1.4rem';
  } else {
    currentOperandElement.innerText = getDisplayNumber(currentOperand) || '0';
    // Dynamic text size adjustment for longer numbers
    if (currentOperand.length > 11) {
      currentOperandElement.style.fontSize = '1.7rem';
    } else if (currentOperand.length > 8) {
      currentOperandElement.style.fontSize = '2.1rem';
    } else {
      currentOperandElement.style.fontSize = '2.5rem';
    }
  }

  // Display previous operand and operator
  if (operation != null) {
    previousOperandElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
  } else {
    previousOperandElement.innerText = '';
  }
}

// ====================================================================
// 4. Loops & Event Listeners for User Input
// ====================================================================

/**
 * LOOP: Iterating over all button elements to attach click event listeners
 * Demonstrates: loops (forEach) and event listeners (addEventListener)
 */
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    // Visual feedback ripple/press
    button.classList.add('active-key');
    setTimeout(() => button.classList.remove('active-key'), 120);

    // If-else conditional routing based on button data attributes
    if (button.dataset.number !== undefined) {
      appendNumber(button.dataset.number);
    } else if (button.dataset.operator !== undefined) {
      chooseOperation(button.dataset.operator);
    } else if (button.dataset.action !== undefined) {
      const action = button.dataset.action;

      if (action === 'clear') {
        clearAll();
      } else if (action === 'delete') {
        deleteLastDigit();
      } else if (action === 'equals') {
        calculate();
      } else if (action === 'percent') {
        calculatePercentage();
      } else if (action === 'negate') {
        toggleSign();
      }
    }
  });
});

// ====================================================================
// 5. Keyboard Support (Event Listener & Key Mapping)
// ====================================================================

/**
 * Event Listener for physical keyboard typing.
 * Maps standard keys to calculator functions.
 */
window.addEventListener('keydown', (event) => {
  const key = event.key;

  // Numbers (0-9) and Decimal (.)
  if ((key >= '0' && key <= '9') || key === '.') {
    highlightButton(`[data-number="${key}"]`);
    appendNumber(key);
  }
  // Operators
  else if (key === '+') {
    highlightButton('[data-operator="+"]');
    chooseOperation('+');
  } else if (key === '-') {
    highlightButton('[data-operator="−"]');
    chooseOperation('−');
  } else if (key === '*' || key === 'x' || key === 'X') {
    highlightButton('[data-operator="×"]');
    chooseOperation('×');
  } else if (key === '/') {
    event.preventDefault(); // Prevent Firefox quick-find shortcut
    highlightButton('[data-operator="÷"]');
    chooseOperation('÷');
  } else if (key === '%') {
    highlightButton('[data-action="percent"]');
    calculatePercentage();
  }
  // Calculate / Equals (Enter or =)
  else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    highlightButton('[data-action="equals"]');
    calculate();
  }
  // Delete / Backspace
  else if (key === 'Backspace') {
    highlightButton('[data-action="delete"]');
    deleteLastDigit();
  }
  // Clear (Escape or Delete)
  else if (key === 'Escape' || key === 'Delete') {
    highlightButton('[data-action="clear"]');
    clearAll();
  }
});

/**
 * Helper to briefly animate the button corresponding to a pressed key.
 * @param {string} selector 
 */
function highlightButton(selector) {
  const btn = document.querySelector(selector);
  if (btn) {
    btn.classList.add('active-key');
    setTimeout(() => btn.classList.remove('active-key'), 120);
  }
}

// ====================================================================
// 6. Light / Dark Theme Toggle Feature
// ====================================================================

// Check stored theme preference or default to dark
const savedTheme = localStorage.getItem('calc-theme') || 'dark';
applyTheme(savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.textContent = '☀️';
    localStorage.setItem('calc-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.textContent = '🌙';
    localStorage.setItem('calc-theme', 'dark');
  }
}

// Initialize display on startup
updateDisplay();

