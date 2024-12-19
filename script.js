const url = "https://fakerestapi.azurewebsites.net/api/v1/Books";

async function getTasks() {
  const response = await fetch(url);

  const result = await response.json();
  const mappedResult = result;
  const tasksList = mappedResult;
  updateLocalStorage(tasksList);
}

function updateLocalStorage(tasksList) {
  localStorage.setItem("tasks", JSON.stringify(tasksList));
}

document.addEventListener("DOMContentLoaded", () => {
  // let tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
  // console.log(tasksList)
  // if (tasksList.length == 0){
  console.log("inn");
  getTasks().then(() => {
    tasksList = JSON.parse(localStorage.getItem("tasks")) || [];
    renderUI(tasksList);
  });

  // }
  // else{
  //   renderUI(tasksList)
  // }
  document.getElementById("sub").addEventListener("click", async function () {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    const requestBody = {
      title: title,
      description: description,
    };

    const response = await fetch(
      "https://fakerestapi.azurewebsites.net/api/v1/Books",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (response.ok) {
      const result = await response.json();
      document.getElementById("responseMessage").innerText =
        "Course created successfully!";
    } else {
      document.getElementById("responseMessage").style.color = "red";
      document.getElementById("responseMessage").innerText =
        "Failed to create course.";
    }
  });
});
function renderUI(tasksList) {
  const element = document.querySelector("#courses .card-group");
  console.log(tasksList);
  element.innerHTML = "";
  tasksList.forEach((item) => {
    element.innerHTML += `<div class="card">
    <img src="./assets/course.jpg" alt="course img" class="card-img">
    <div class="card-content">
        <div class="card-title">${item.title}</div>
        <p class="card-dis">
           ${item.description}
        </p>
       <a href="info.html"> <button class="btn" id="btn-${item.id}">View Course</button></a>
    </div>
</div>`;
  });
  tasksList.forEach((item) => {
    let buttnon = document.querySelector(`#btn-${item.id}`);
    buttnon.addEventListener("click", () => {
      console.log(item.id);
      localStorage.setItem("selectedItem", JSON.stringify(item.id));
    });
  });
}
