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


let payments = JSON.parse(localStorage.getItem('payments')) || [] ;
let idCounter = payments.length ? Math.max(...payments.map(p => p.id)) + 1 : 0 ;
let count = payments.length;


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
    date: dateInput.value
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
  stateTittel.innerHTML = 'Nothing logged yet add your first payment.';
};



function so(){
  addItem() ; 
}

addBt.onclick = so ;

 
  //date to today
dateInput.valueAsDate = new Date();
