const categoryColors = {
    Food: '#e8a33d',
    Rent: '#d96c6c',
    Transport: '#7fa69a',
    Shopping: '#c98bd9',
    Bills: '#6c9fd9',
    Health: '#6cd9a3',
    Fun: '#d9c46c',
    Other: '#a0a0a0'
};

//variabls name change it in the last var changet and make it like the id name 
const form = document.getElementById('paymentForm');
const descInput = document.getElementById('descInput');
const amountInput = document.getElementById('amountInput');
const categoryInput = document.getElementById('categoryInput');
const dateInput = document.getElementById('dateInput');
const receiptList = document.getElementById('receiptList');
const emptyState = document.getElementById('emptyState');
const totalDisplay = document.getElementById('totalDisplay');
const countDisplay = document.getElementById('countDisplay');
const categoryBreakdown = document.getElementById('categoryBreakdown');
const clearBtn = document.getElementById('clearBtn');
const exportBtn = document.getElementById('exportBtn');
const state_tittle = document.getElementById('state-tittle');
const addBt =document.getElementById('addBt') ; 
const stateTittel = document.getElementById('state-tittle') ; 
const addMoney = document.getElementById('addMoney') ; 
const addBtTotallDispaly = document.getElementById('addBtTotallDispaly') ;
const minBtTotallDispaly = document.getElementById('minBtTotallDispaly') ;
const clearBtTotallDispaly = document.getElementById('clearBtTotallDispaly') ; 

let payments = JSON.parse(localStorage.getItem('payments')) || [] ;
let idCounter = payments.length ? Math.max(...payments.map(p => p.id)) + 1 : 0 ;
let count = payments.length ;

//TotalDisplay LocalStorage  .
function setBudget(money){
  localStorage.setItem('money',money) ;
}

function loadBudget(){
  let savedBudget = Number(localStorage.getItem("money"))||0 ; //get the saved total when the page reload 
  totalDisplay.innerHTML = `${savedBudget.toFixed(2)}`
}


function renderPayment(payment) {
  const p = document.createElement('p');
  p.textContent = payment.descTion ;
  p.style.color = categoryColors[payment.categorys] ;

  let del = document.createElement("button") ;
  del.textContent = " ❌" ;

  let info = document.createElement('button') ;
  info.textContent = 'ℹ️' ;

  let infoBox = document.createElement('span') ; // shows details 'inline'

  del.onclick = function () {
    p.remove();
    payments = payments.filter(item => item.id !== payment.id) ; // remove just item
    localStorage.setItem('payments', JSON.stringify(payments)) ; // save updated array
    count--;
    if(count === 0){
      countDisplay.innerHTML = '0 payments logged' ;
    }else{countDisplay.innerHTML = count}
    if (count === 0) {
      stateTittel.innerHTML = 'Nothing logged yet add your first payment .';
    }
    
  };

  info.onclick = function () {
    infoBox.textContent =
      ` | Amount: ${payment.amounts} | Category: ${payment.categorys} | Date: ${payment.date}`;
  };

  p.appendChild(del);
  p.appendChild(info);
  p.appendChild(infoBox);
  document.getElementById('receiptList').appendChild(p);

  countDisplay.innerHTML = count ;
}

function addItem() {
  const input = document.getElementById('descInput');
  const text = input.value; 
  let category = categoryInput.value;
  stateTittel.innerHTML = '';
  if (text == "") return;

  const payment = {
    id: idCounter,
    descTion: descInput.value,
    amounts: amountInput.value,
    categorys: categoryInput.value,
    date: dateInput.value ,    
  };
  idCounter++;
  count++;
  payments.push(payment);
  localStorage.setItem('payments', JSON.stringify(payments));

  renderPayment(payment);
  input.value = "";
   
}

// Rebuild the list from localStorage when the page loads
window.addEventListener('DOMContentLoaded', function () {
  if (payments.length === 0) {
    stateTittel.innerHTML = 'Nothing logged yet add your first payment.';
  } else {
    payments.forEach(renderPayment);
  }
  

});

clearBtn.onclick = function clearAll() {
  
  document.getElementById('receiptList').replaceChildren();
  count = 0;
  payments = [];
  localStorage.removeItem('payments');
  countDisplay.innerHTML = '0 payments logged' ;
  stateTittel.innerHTML = 'Nothing logged yet add your first payment.';
};




// Operitons . 
function addTtoaAmount(){
   let convM = Number(addMoney.value) ; 
   totalDisplay.innerHTML = `${convM.toFixed(2)}`;
   setBudget(convM) ;
};
  
function subTotalAmount(){
  let m = Number(totalDisplay.innerHTML)  
   
  if(m>0){
    totalDisplay.innerHTML = m-1 ;//Add dicinmal 0.00  
  }  
  setBudget(m)
};

function clearAllTotalAmount(){
  totalDisplay.innerHTML = '0';
  setBudget(0); 
}

function statsOFDisplay(){
  let currentStatus = Number(totalDisplay.innerHTML) ;
  let amountInputValue = Number(amountInput.value) ;  
  let updatStatus = currentStatus - amountInputValue    ; 
  totalDisplay.innerHTML = updatStatus; 
  setBudget(updatStatus)
}

function events(){
  addItem() ; 
  statsOFDisplay() ; 
}

// Load saved totalBudget 
loadBudget();

addBtTotallDispaly.onclick = addTtoaAmount ; 
minBtTotallDispaly.onclick = subTotalAmount ; 
clearBtTotallDispaly.onclick = clearAllTotalAmount ; 
addBt.onclick = events;

 
  // date to today
dateInput.valueAsDate = new Date();
