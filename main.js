let inputField = document.getElementById("input");
let taskList = document.getElementById("task-list");
let addSection = document.getElementById("add-form");
let editSectiom = document.getElementById("edit-form");
let editInput = document.getElementById("edit-input");

let task = JSON.parse(localStorage.getItem("Task")) || [];

function showTask() {
  taskList.innerHTML = task
    .map((list, ind) => {
      return ` <li id=${ind} class=${list?.checked ? "checked" : undefined}>
           ${
             list?.value
           } <button onclick="edit(${ind})"><i class="fa fa-edit"></i></button> <span><i class="fa fa-trash"></i></span>
          </li>`;
    })
    .join("");
}

showTask();
function addTask() {
  if (inputField.value === "") {
    return alert("please write a task");
  }

  task.push({ value: inputField.value, checked: false });

  localStorage.setItem("Task", JSON.stringify(task));
  showTask();
  inputField.value = "";
}

function edit(index) {
  editInput.value = index;
  addSection.style.display = "none";
  editSectiom.style.display = "block";
  inputField.value = task[index]["value"];
}

function editTask() {
  ind = editInput.value;
  task[ind]["value"] = inputField.value;
  localStorage.setItem("Task", JSON.stringify(task));
  showTask();
  addSection.style.display = "block";
  editSectiom.style.display = "none";
  inputField.value = "";
}

taskList.addEventListener("click", function (e) {
  let ind = e.target.getAttribute("id");
  if (e.target.tagName === "LI") {
    task[ind]["checked"] = !task[ind]["checked"];
    localStorage.setItem("Task", JSON.stringify(task));
    showTask();
  } else if (
    e.target.tagName === "I" &&
    e.target.parentNode.tagName === "SPAN"
  ) {
    task.splice(ind, 1);
    localStorage.setItem("Task", JSON.stringify(task));
    showTask();
  }
});

function saveTask() {
  localStorage.setItem("Task", JSON.stringify(taskList.innerHTML));
}
