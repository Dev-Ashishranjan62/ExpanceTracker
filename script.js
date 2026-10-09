const expanceName = document.getElementById("expense-name");
const expanceAmount = document.getElementById("expense-amount");
const expanceList = document.getElementById("expense-list");
const expenseForm = document.getElementById("expense-form");
const totalAmount = document.getElementById("total-amount");
let amount = 0;
const expance = JSON.parse(localStorage.getItem("expance")) || [];
expance.forEach((item) => randerTask(item));

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const eName = expanceName.value.trim();
  const eAmount = expanceAmount.value.trim();
  if (eAmount.length == 0) return;
  if (eName == "") return;

  const newTask = {
    eName: eName,
    eAmount: eAmount,
    id: Date.now(),
  };
  expance.push(newTask);
  randerTask(newTask);
  saveTask();
});

function randerTask(item) {
  const li = document.createElement("li");
  li.innerHTML = `
     <span> ${item.eName} - ${item.eAmount} </span>
     <button data-id=${item.id} class="remove"> Remove </button>
  `;
  expanceList.appendChild(li);
  amount += parseFloat(item.eAmount);
  totalAmount.textContent = amount;
  expanceAmount.value = "";
  expanceName.value = "";
  saveTask();
}
expanceList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    const id = e.target.getAttribute("data-id");
    const index = expance.findIndex((p) => p.id == id);
    const removeAmount = expance[index].eAmount;
    let task = expance.splice(index, 1);
    const indexs = e.target.closest("li");
    amount -= parseFloat(removeAmount);
    totalAmount.textContent = amount;
    indexs.remove();

    saveTask();
  }
});

function saveTask() {
  localStorage.setItem("expance", JSON.stringify(expance));
}
