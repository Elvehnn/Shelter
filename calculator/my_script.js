const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const clearBtns = document.querySelectorAll('.clear-btn');
const decimalBtn = document.getElementById('decimal');
// const resultBtn = document.getElementById('result');
const display = document.getElementById('display');

let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';

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

// function operationPress(op) {
//     let localMemory = display.value;
//     if (memoryNewNumber && memoryPendingOperation !== '=') {
//         display.value = memoryCurrentNumber;
//       } else {
//           memoryNewNumber = true;
//           switch (op) {
//               case '+':
//                 // console.log('до' + memoryCurrentNumber);
//                 memoryCurrentNumber = memoryCurrentNumber + (+localMemory);
//                 console.log(memoryCurrentNumber);
//                 break;
//               case '-':
//                 memoryCurrentNumber -= +localMemory;
//                 break;
//               case '*':
//                 memoryCurrentNumber *= +localMemory;
//                 break;
//               case '/':
//                 memoryCurrentNumber /= +localMemory;
//                 break;
//               case '^':
//                 console.log( 'степень' );
//                 break;
//               case 'sqrt':
//                 console.log( 'корень' );
//                 break;
//               case '=' :
//                 console.log ('равно ');
//                 memoryCurrentNumber = +localMemory;
//                 console.log (localMemory);
//                 break;
//           }
//         // console.log('после 2 ' + memoryCurrentNumber);
//         display.value = memoryCurrentNumber;
//         memoryPendingOperation = op;
//       }
//     }

function operationPress(op) {
  let localMemory = display.value;
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
      memoryCurrentNumber /= +localMemory;
    } else if (memoryPendingOperation === 'Xn') {
      // console.log('нажата операция степень ' + localMemory);
      memoryCurrentNumber = Math.pow(memoryCurrentNumber, +localMemory);
    } else if (memoryPendingOperation === '\u221A') {
      // console.log('нажата операция корень ' + localMemory + 'степени');
        // if (memoryCurrentNumber <= 0 || localMemory <= 0) {
        //   display.value = 'невозможно';
        // } else {
          memoryCurrentNumber = Math.pow(memoryCurrentNumber, 1/(+localMemory));
        // };      
    } else {
      memoryCurrentNumber = +localMemory;
    }
    memoryCurrentNumber = Math.round(memoryCurrentNumber * 1000000000000000) / 1000000000000000;
    display.value = memoryCurrentNumber;
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





