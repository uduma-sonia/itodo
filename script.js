const addBtn = document.querySelector("#add-btn");
const clearAllBtn = document.querySelector("#clear-btn");
let list = [];

window.onload = function () {
  if (JSON.parse(localStorage.getItem("list")) != null)
    list = JSON.parse(localStorage.getItem("list"));

  display();
};

addBtn.addEventListener("click", function (e) {
  e.preventDefault();

  addList();
  document.querySelector(".addText").value = "";
});

// FUNCTION TO ADD TO LOCALSTORAGE
function addList() {
  const addText = document.querySelector(".addText").value;

  if (addText.trim() != " ") {
    list.push(addText.trim());
    if (localStorage.getItem("list") == null) {
      localStorage.setItem("list", JSON.stringify(list));
    } else {
      localStorage.setItem("list", JSON.stringify(list));
    }
  }

  display();
}

// FUNCTION TO DISPLAY THE LIST
function display() {
  const listContainer = document.querySelector(".list-container");
  listContainer.innerHTML = "";

  for (var i = 0; i < list.length; i++) {
    listContainer.innerHTML += `
    <li>${list[i]} <span onclick='del("+ i +")' class="uk-margin-small-right uk-align-right" uk-icon="trash"></span> </li>
    `;
  }
}

// FUNCTION TO CLEAR ALL LIST
clearAllBtn.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// FUNCTION TO CLEAR ONE LIST ITEM
function del(id) {
  list.splice(id, 1);
  if (localStorage.getItem("list") == null) {
    localStorage.setItem("list", JSON.stringify(list));
  } else {
    localStorage.setItem("list", JSON.stringify(list));
  }
  display();
}

// FOR THE PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => {
      console.log(registration);
    })
    .catch((error) => {
      console.log(error);
    });
}
