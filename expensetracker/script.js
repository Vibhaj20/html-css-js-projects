const balanceEl=document.getElementById("balance-amt");
const incomeEl=document.getElementById("income-amt");
const expenseEl=document.getElementById("expense-amt");
const transactionListEl=document.getElementById("transaction-list");
const transactionformEl=document.getElementById("transaction-form");
const descriptionEl=document.getElementById("description");
const amountEl=document.getElementById("amount");

let transactions=JSON.parse(localStorage.getItem("transactions"))||[];

transactionformEl.addEventListener("submit",addTransaction);

function addTransaction(e){
    e.preventDefault();

    const description=descriptionEl.value.trim();
    const amount=parseFloat(amountEl.value);
    transactions.push({
        id:Date.now(),
        description,
        amount
    })
    localStorage.setItem("transactions",JSON.stringify(transactions));
    updateTransactionList();
    updateSummary();
    transactionformEl.reset()
}

function updateTransactionList(){
    transactionListEl.innerHTML=""
    const sortedTransactions=[...transactions].reverse();
    sortedTransactions.forEach((transaction)=>{
        const transactionEl=createTransactionElement(transaction)
        transactionListEl.appendChild(transactionEl)
    })
}

function createTransactionElement(transaction){
   const li =  document.createElement("li");
   li.classList.add("transaction");
   li.classList.add(transaction.amount > 0  ?"income":"expense")

   li.innerHTML=`
     <span> ${transaction.description}</span>
     <span> 
     ${formatCurrency(transaction.amount)}
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button></span>
   `;
 return li;
   

}
function updateSummary(){
    const balance=transactions.reduce((acc,transaction)=>acc+transaction.amount,0);
    const income=transactions.filter(transaction=>transaction.amount>0).reduce((acc,transaction)=>acc+transaction.amount,0);
    const expense=transactions.filter(transaction=>transaction.amount<0).reduce((acc,transaction)=>acc+transaction.amount,0);

    balanceEl.textContent= formatCurrency(balance)
    incomeEl.textContent= formatCurrency(income)
    expenseEl.textContent=formatCurrency(expense)
}

function formatCurrency(number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(number);
}

function removeTransaction(id){
    transactions=transactions.filter(transaction =>transaction.id !==id);
    localStorage.setItem("transactions",JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();
}
updateTransactionList();
updateSummary()


