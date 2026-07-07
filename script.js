const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const addBtn = document.getElementById("addBtn");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateValues() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach(transaction => {
        if (transaction.type === "income") {
            incomeTotal += transaction.amount;
        } else {
            expenseTotal += transaction.amount;
        }
    });

    balance.textContent = "₹" + (incomeTotal - expenseTotal).toFixed(2);
    income.textContent = "₹" + incomeTotal.toFixed(2);
    expense.textContent = "₹" + expenseTotal.toFixed(2);
}

function displayTransactions() {
    list.innerHTML = "";

    transactions.forEach((transaction, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${transaction.text} (${transaction.type})</span>
            <span>₹${transaction.amount}</span>
            <button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button>
        `;

        list.appendChild(li);
    });

    updateValues();
    updateLocalStorage();
}

function addTransaction() {
    const description = text.value.trim();
    const value = Number(amount.value);

    if (description === "" || value <= 0) {
        alert("Please enter valid details.");
        return;
    }

    transactions.push({
        text: description,
        amount: value,
        type: type.value
    });

    text.value = "";
    amount.value = "";

    displayTransactions();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    displayTransactions();
}

addBtn.addEventListener("click", addTransaction);

displayTransactions();