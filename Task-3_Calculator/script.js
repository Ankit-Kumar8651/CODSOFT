class Calculator {
    
  constructor() {
    this.currentInput = '0';
    this.calculation = '0';
    this.result = '0';
    this.history = [];
    this.isDark = false;
    this.isHistoryOpen = false;

    this.calculationElement = document.getElementById('calculation');
    this.resultElement = document.getElementById('result');
    this.historyPanel = document.getElementById('history-panel');
    this.historyItems = document.getElementById('history-items');
    
    this.init();
  }

  init() {
    this.loadTheme();
    this.loadHistory();
    this.setupEventListeners();
    this.updateDisplay();
  }

  setupEventListeners() {
    // Button clicks
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const value = btn.getAttribute('data-value');
        this.handleButtonClick(value);
      });
    });
        document.getElementById('back-button').addEventListener('click', () => {
    this.toggleHistory();
    });

    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
      this.toggleTheme();
    });

    // History toggle
    document.getElementById('history-toggle').addEventListener('click', () => {
      this.toggleHistory();
    });

    // Clear history
    document.getElementById('clear-history').addEventListener('click', () => {
      this.clearHistory();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      this.handleKeyboardInput(e);
    });
  }

  handleButtonClick(value) {
    switch(value) {
      case 'AC':
        this.clearAll();
        break;
      case 'DEL':
        this.deleteLastChar();
        break;
      case '=':
        this.calculate();
        break;
      default:
        this.appendInput(value);
    }
    this.updateDisplay();
  }

  appendInput(value) {
    if (this.currentInput === '0' && value !== '.') {
      this.currentInput = value;
    } else {
      this.currentInput += value;
    }
    this.calculation = this.currentInput;
  }

  deleteLastChar() {
    if (this.currentInput.length > 1) {
      this.currentInput = this.currentInput.slice(0, -1);
    } else {
      this.currentInput = '0';
    }
    this.calculation = this.currentInput;
  }

  clearAll() {
    this.currentInput = '0';
    this.calculation = '0';
    this.result = '0';
  }

  calculate() {
    try {
      // Replace display symbols with actual operators
      let expression = this.currentInput
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/%/g, '*0.01');
      
      // Calculate result
      const calculationResult = eval(expression);
      
      // Handle special cases
      if (!isFinite(calculationResult)) {
        throw new Error(calculationResult > 0 ? '∞' : '-∞');
      }
      
      this.result = calculationResult.toString();
      
      // Add to history
      this.addToHistory(this.currentInput, this.result);
      
      // Prepare for next calculation
      this.currentInput = this.result;
    } catch (error) {
      this.result = error.message === '∞' || error.message === '-∞' ? error.message : 'Error';
    }
  }

  addToHistory(calculation, result) {
    this.history.unshift({ calculation, result });
    if (this.history.length > 10) {
      this.history.pop();
    }
    this.saveHistory();
    this.updateHistoryDisplay();
  }

  clearHistory() {
    this.history = [];
    this.saveHistory();
    this.updateHistoryDisplay();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark', this.isDark);
    localStorage.setItem('calculatorDarkMode', this.isDark);
    this.updateThemeIcon();
  }

  toggleHistory() {
    this.isHistoryOpen = !this.isHistoryOpen;
    this.historyPanel.classList.toggle('active', this.isHistoryOpen);
  }

  updateThemeIcon() {
    const icon = document.querySelector('#theme-toggle i');
    icon.className = this.isDark ? 'fas fa-sun' : 'fas fa-moon';
  }

  updateDisplay() {
    this.calculationElement.textContent = this.calculation;
    this.resultElement.textContent = this.result;
    
    // Auto-scroll for long numbers
    this.calculationElement.scrollLeft = this.calculationElement.scrollWidth;
    this.resultElement.scrollLeft = this.resultElement.scrollWidth;
  }

  updateHistoryDisplay() {
    this.historyItems.innerHTML = '';
    this.history.forEach(item => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <div class="history-calculation">${item.calculation}</div>
        <div class="history-result">= ${item.result}</div>
      `;
      historyItem.addEventListener('click', () => {
        this.currentInput = item.calculation;
        this.calculation = item.calculation;
        this.result = item.result;
        this.updateDisplay();
        this.toggleHistory();
      });
      this.historyItems.appendChild(historyItem);
    });
  }

  handleKeyboardInput(e) {
    const key = e.key;
    
    if (key >= '0' && key <= '9') {
      this.appendInput(key);
    } else if (key === '.') {
      this.appendInput('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      this.appendInput(key === '*' ? '×' : key === '/' ? '÷' : key);
    } else if (key === '%') {
      this.appendInput('%');
    } else if (key === 'Enter') {
      this.calculate();
    } else if (key === 'Backspace') {
      this.deleteLastChar();
    } else if (key === 'Escape') {
      this.clearAll();
    } else if (key === 'h' || key === 'H') {
      this.toggleHistory();
    }
    
    this.updateDisplay();
  }

  loadTheme() {
    this.isDark = localStorage.getItem('calculatorDarkMode') === 'true';
    document.body.classList.toggle('dark', this.isDark);
    this.updateThemeIcon();
  }

  loadHistory() {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
      this.history = JSON.parse(savedHistory);
      this.updateHistoryDisplay();
    }
  }

  saveHistory() {
    localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
  }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Calculator();
});