const balance = document.getElementById("balance"),
  moneyPlus = document.getElementById("moneyPlus"),
  moneyMins = document.getElementById("moneyMins"),
  list = document.getElementById("list"),
  form = document.getElementById("form"),
  text = document.getElementById("text"),
  amount = document.getElementById("amount");

let transactions = [];

form.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();



  const transaction = { 
    id: generateID(),
    text: text.value, 
    amount: +amount.value ,
};

  addTransactionDOM(transaction);
  transactions.push(transaction);
  
  updateTransaction();
  text.value=" ",
  amount.value=" ",
  init();
}

function generateID() {
    return Math.floor(Math.random() * 100000000);
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

item.classList.add(transaction.amount < 0 ? "minus" : "plus");

item.innerHTML = `${transaction.text}
  <div>
    <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete" onclick="removeTransaction(${transaction.id})">x</button>
  </div>`;
list.appendChild(item);

}

function removeTransaction(id){
    transactions=transactions.filter((transaction)=> transaction.id !==id);
    init();
}

function init(){
    list.innerHTML="";
    if(transactions.length==0){
        const item=document.createElement("li");
        item.innerHTML="No Transaction";
        list.appendChild(item);
    }

    transactions.forEach(addTransactionDOM);
}

    function updateTransaction() {
        const amounts=transactions.map((transaction)=> transaction.amount);
        const total=amounts.reduce((acc, item)=> (acc +=item), 0).toFixed(2);
        
        const income=amounts.filter((item)=>item>0).reduce((acc, item)=>(acc+=item), 0).toFixed(2);
        const expense=(amounts.filter((item)=>item<0).reduce((acc, item)=>(acc+=item), 0) *-1).toFixed(2);
        
        balance.innerText = `$${total}`;
        moneyPlus.innerText = `$${income}`;
        moneyMins.innerText = `$${expense}`;
    }
