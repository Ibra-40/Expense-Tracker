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

let payments = [];
let idCounter = 1;

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
let count = 0 ; 

//Payment list
function addItem(){
  const input = document.getElementById('descInput') ; 
  const text = input.value ;
  count++ ; 
  stateTittel.innerHTML = '';
  if(text =="")return;
  
  const p = document.createElement('p'); 
  p.textContent = text ; 

  document.getElementById('receiptList').appendChild(p) ; 

  input.value = "" ; 

  let del = document.createElement("button") ; 
  del.textContent = " ❌";

  del.onclick=function(){
    p.remove(); 
    count-- ;  
    if(count == 0){
      stateTittel.innerHTML = 'Nothing logged yet add your first payment.';
    }    
  }

  p.appendChild(del)

  //textContent.textContent = "" ;
  //Remove all itemes 
  clearBtn.onclick = function clearAll(){
    document.getElementById('receiptList').replaceChildren() ; 
    count = 0 ; 
    stateTittel.innerHTML = 'Nothing logged yet add your first payment.';//This isn`t show so see it 
}  
  
}
//Here below it moust be a amount price



function addAmount(){
  const input_amount = document.getElementById('amountInput') ; 
  const amount = input.value ; 
  
  if(amount===0.00) return; 

  const am = document.createElement('p') ; 
  p.textContent =amount ; 
  document.getElementById('receiptList').appendChild(p) ; 
  input.value = "" ; 
}
//Here below i was make delte button complate it 
function delItem(){
  
}
function so(){
  addItem() ; 
  addAmount()
}

addBt.onclick = so ;



  //date to today
dateInput.valueAsDate = new Date();

