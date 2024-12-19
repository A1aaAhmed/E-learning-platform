const url = "https://fakerestapi.azurewebsites.net/api/v1/Books";

const id = JSON.parse(localStorage.getItem("selectedItem"));
let item;
async function deleteRemoteTask() {
  let tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
  let itemToDelete = JSON.parse(localStorage.getItem("item")) || "";

  tasksList = tasksList.filter((item) => item.id !== itemToDelete.id);
  localStorage.setItem("tasks", JSON.stringify(tasksList));
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
  });
}
async function getRemoteTask() {
  const response = await fetch(`${url}/${id}`);
  const result = await response.json();
  localStorage.setItem("item", JSON.stringify(result));
}

async function editeRemoteTask(taskId, newValue) {
  console.log("innn remote");
  let item_;
  let tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
  tasksList = tasksList.map((item) => {
    if (item.id == taskId) {
      
      item.description = newValue;
      item_=item
    }
    return item;
  });
  localStorage.setItem("tasks", JSON.stringify(tasksList));
console.log(item_)
  const response = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item_),
  });
}
document.addEventListener("DOMContentLoaded", () => {
  getRemoteTask(id).then(() => {
    let item = JSON.parse(localStorage.getItem("item")) || "";
    console.log(item);

    let showInfo = document.querySelector("#showInfo");
    showInfo.innerHTML = `
          <h1>${item.title}</h1>
         <img src="./assets/course.jpg" alt="course img" class="card-img">
         <input id ="in2" type="text">
         <p id="data">${item.description}</p>
         <button id="edite" class="btn">Edite</button>
         <button id="submit" class="btn">Submit</button>
        <a id="aDel" href="task2.html"><button id="delete" class="btn">Delete</button></a>
  `;
    const input2 = document.querySelector("#in2");
    const data = document.querySelector("#data");
    let editeBtn = document.querySelector("#edite");
    let deleteBtn = document.querySelector("#delete");
    let submitBtn = document.querySelector("#submit");
    let deleteTag = document.querySelector("#aDel");
    submitBtn.style.display = "none";

    input2.value = item.description;

    input2.style.display = "none";
    input2.style.margin = "1rem";
    input2.style.width = "70%";
    input2.style.height = "2rem";
    input2.style.fontSize = "x-large";

    editeBtn.addEventListener("click", () => {
      console.log("edite");
      input2.style.display = "flex";
      data.style.display = "none";
      submitBtn.style.display = "block";
      editeBtn.style.display = "none";
      deleteTag.style.display = "none";
    });

    submitBtn.addEventListener("click", () => {
      console.log("submit");
      data.innerText = input2.value;
      editeRemoteTask(item.id, input2.value);
      input2.style.display = "none";
      data.style.display = "block";
      submitBtn.style.display = "none";
      editeBtn.style.display = "inline-block";
      deleteTag.style.display = "inline-block";
      deleteTag.style.paddingTop = "0";
    });

    deleteBtn.addEventListener("click", () => {
      deleteRemoteTask(item.id);
      console.log("delete");
    });
  });
});
