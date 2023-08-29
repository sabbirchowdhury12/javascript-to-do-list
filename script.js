let inputField = document.getElementById("input");
let taskList = document.getElementById("task-list");

function addTask() {
  console.log(inputField.value);
  if (inputField.value === "") {
    return alert("please write a task");
  }

  let li = document.createElement("li");
  li.innerHTML = inputField.value;
  taskList.appendChild(li);
  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);
  saveTask();
  inputField.value = "";
}

taskList.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveTask();
  } else if (e.target.tagName === "UL") {
    return;
  } else {
    e.target.parentElement.remove();
    saveTask();
  }
});

function saveTask() {
  localStorage.setItem("Task", taskList.innerHTML);
}

function getData() {
  taskList.innerHTML = localStorage.getItem("Task");
}

getData();
