const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
// const resultBtn = document.getElementById('result');
const display = document.getElementById('display');

let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation, memoryString = '';

for (let i = 0; i < numbers.length; i++) {
    let numberBtn = numbers[i];
    numberBtn.addEventListener('click', function (e) {
      numberPress(e.target.textContent);
    });
  }
  
for (let i = 0; i < operations.length; i++) {
    let operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
     operationPress(e.target.textContent);
    });
  }
  
for (let i = 0; i < clearBtns.length; i++) {
    let clearBtn = clearBtns[i];
    clearBtn.addEventListener('click', function (e) {
      clearPress(e.target.textContent);
    });
  }

decimalBtn.addEventListener('click', decimalPress);
  

function numberPress(num) {
  if (memoryNewNumber) {
    display.value = num;
    memoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = num;
    } else {
      display.value += num;
    }
  }
}

function sqrtPress(сurrentNumber) {
    if (сurrentNumber > 0) {
      сurrentNumber = Math.sqrt(сurrentNumber);
      return(сurrentNumber);
    }
    else {
      сurrentNumber = 'ERROR';
      return(сurrentNumber);  
    }
}

function operationPress(op) {
  let localMemory = display.value;
  
  if (op === '+/-' && memoryPendingOperation === '') {
    memoryCurrentNumber = -(+localMemory);
    display.value = memoryCurrentNumber;
  } else if (op === '+/-' && memoryPendingOperation !== 0) {
    localMemory = -display.value;
    display.value = localMemory;
  } else {
      if (memoryString.length <= 18) {
        memoryString += display.value + op;
        display_memory.value = memoryString;
      } else {
        memoryString = ''; 
        memoryString += display.value + op;
        display_memory.value = memoryString;
      }
      if (memoryNewNumber && memoryPendingOperation !== '=') {
          display.value = memoryCurrentNumber;
      } else {
          memoryNewNumber = true;
          
          if (memoryPendingOperation === '+') {
            memoryCurrentNumber += +localMemory;
          } else if (memoryPendingOperation === '-') {
            memoryCurrentNumber -= +localMemory;
          } else if (memoryPendingOperation === '*') {
            memoryCurrentNumber *= +localMemory;
          
          } else if (memoryPendingOperation === '/') {
              if (+localMemory == 0) {
                display.value = 'ERROR';
                memoryNewNumber = true;
                memoryCurrentNumber = 0;
                memoryPendingOperation = '';
                memoryString = ''; 
                display_memory.value = memoryString;
                return;
              } else {
                memoryCurrentNumber /= +localMemory;
              }   

          } else if (memoryPendingOperation === 'Xn') {
              if (+localMemory >= 1 || +localMemory === 0) {
                memoryCurrentNumber = Math.pow(memoryCurrentNumber, +localMemory);
              } else if ((+localMemory > 0 || +localMemory < 1) && memoryCurrentNumber >= 0) {
                memoryCurrentNumber = Math.round(Math.pow(memoryCurrentNumber, +localMemory));
              } else {
                display.value = 'ERROR';
                memoryNewNumber = true;
                memoryCurrentNumber = 0;
                memoryPendingOperation = '';
                memoryString = ''; 
                display_memory.value = memoryString;
                return;
              }

          } else if (memoryPendingOperation === 'n' +'\u221A'+ 'x') {
              if (((+localMemory % 2 === 0) && memoryCurrentNumber <= 0) || +localMemory === 0) {
                display.value = 'ERROR';
                memoryNewNumber = true;
                memoryCurrentNumber = 0;
                memoryPendingOperation = '';
                memoryString = ''; 
                display_memory.value = memoryString;
                return;
              } else if ((+localMemory % 2 !== 0) && memoryCurrentNumber <= 0) {
                memoryCurrentNumber = -1 * Math.round(Math.pow(Math.abs(memoryCurrentNumber), 1/(+localMemory)));
              } else {
                memoryCurrentNumber = Math.round(Math.pow(memoryCurrentNumber, 1/(+localMemory)));
              }
              
          } else {
            memoryCurrentNumber = +localMemory; 
            
          }
        }
        
        if (op === '\u221A') {
          memoryCurrentNumber = sqrtPress(memoryCurrentNumber);
          display.value = memoryCurrentNumber;
          return;
        };
        
        memoryCurrentNumber = Math.round(memoryCurrentNumber * 1000000000) / 1000000000;
        
        display.value = memoryCurrentNumber;
        // memoryString = '';
        // memoryString += display.value;
        // console.log(memoryString);
        memoryPendingOperation = op;
       
      }
  }
   

function decimalPress() {
  let localDecimalMemory = display.value;
  if (memoryNewNumber) {
    localDecimalMemory = '0.';
    memoryNewNumber = false;
  } else {
    if (localDecimalMemory.indexOf('.') === -1) {
      localDecimalMemory += '.';
    }
  }
  display.value = localDecimalMemory;
} 


function clearPress(id) {
  display_memory.value = '';
  if (id === 'ce') {
    
    display.value = '0';
    memoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    memoryNewNumber = true;
    memoryCurrentNumber = 0;
    memoryPendingOperation = '';
  }
}





