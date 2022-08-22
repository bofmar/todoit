// OBJECTS
import toDoItem from "./classes/todo.js";
import Project from "./classes/project.js";
import MasterProject from "./classes/master.js";
// PAGES
import sidebar from "./components/sidebar.js";
import projectPanel from "./components/projectsPanel.js";
import today from "./components/today.js";
import upcoming from "./components/upcoming.js";
import addItemModal from "./components/addItemModal.js";
import formError from "./components/formError.js";
// APIs
import { createProjectLi } from "./helpers.js";
import test from "./time.js";

const body = document.querySelector("body");
const master = new MasterProject();
body.appendChild(sidebar(master.getProjectsList()));
const addItemModalDOM = addItemModal(master.getProjectsList());
body.appendChild(addItemModalDOM);
const addItemForm = addItemModalDOM.querySelector("form");
const formErrorModal = formError();
body.appendChild(formErrorModal);

let currentPage = "All Projects";

(function initialize(){
  master.parseFromJSON(localStorage.master);
  body.appendChild(projectPanel(master));

  hookButtons();

  document.querySelector(".item-modal-add").addEventListener("click", (e)=> {
    e.preventDefault();
    const result = {
      title: document.getElementById("item-title").value,
      date: document.getElementById("item-due").value,
      description: document.getElementById("item-description").value,
      priority: document.getElementById("item-priority").value,
      project: document.getElementById("item-project").value
    }
    if(result.title === ""){
      formErrorModal.showModal();
      return;
    }
    if(result.date === ""){
      result.date = "Never";
    }
    addItem(result);
    addItemForm.reset();
    addItemModalDOM.close();
  }); // hook the add button in the add item dialogue modal

  document.querySelector(".item-modal-cancel").addEventListener("click", (e)=> {
    e.preventDefault();
    addItemForm.reset();
    addItemModalDOM.close();
  }); // hook the cancel button in the add item dialogue modal

  formErrorModal.querySelector("button").addEventListener("click", (e)=>{
    e.preventDefault();
    formErrorModal.close();
  }); // hook the ok button in the form error modal

  const navButtons = document.querySelectorAll(".nav-button");
  navButtons.forEach(button => button.addEventListener("click", ()=> {
    swapPage(button);
  }));
})();

function swapPage(button){
  body.removeChild(body.lastChild);

  if(button.hasAttribute("id")){ // we are dealing with a project
    const project = master.findProjectFromID(button.getAttribute("id"));
    currentPage = button.getAttribute("id");
    body.appendChild(projectPanel(project));
  }
  else{
    const name = button.innerText;
    switch(name) {
      case "All Projects" :
        currentPage = button.innerText;
        body.appendChild(projectPanel(master));
        break;
      case "Today" :
        body.appendChild(today(master));
        break;
      case "Upcoming" :
        body.appendChild(upcoming(master));
        break;
    }
  } // one of the default pages was selected

  console.log(currentPage);
  hookButtons();
}

function hookButtons(){
  // on initial page load and after we switch pages, some buttons need to always be hooked with event listeners

  document.querySelector(".add-item-button").addEventListener("click", ()=> {
    addItemModalDOM.showModal();
  }); // the new add item button is hooked

  const projWrap = document.querySelector(".project-wrapper");
  const liItems = projWrap.querySelectorAll("li");
  liItems.forEach(li =>{
    const buttonsList = li.querySelectorAll("button");
    const id = li.getAttribute("data-id");

    // First element is the project name. Clicking it will toggle done state.
    // Second element is the details. Clicking it will bring up a modal that states the description.
    // Third element is the edit button. Clicking it will bring up the change dialogue.

    // Final element is the delete button.Clicking it will remove the element.
    buttonsList[3].addEventListener("click", ()=> {
      deleteItem(id);
    });
  }); // hook the buttons in the items list
}

function addItem(proj){
  const newItem = master.createItem(proj.title, proj.date, proj.description, proj.priority, null, proj.project === "none" ? null : proj.project);
  if(currentPage === "All Projects" || currentPage === proj.project){
    const ul = document.querySelector(".items-list");
    createProjectLi(ul, [newItem]);
    const newLi = ul.lastChild;
    const newLiButtons = newLi.querySelectorAll("button");
    newLiButtons[3].addEventListener("click", ()=> {
      deleteItem(newItem.getID());
    });
  } // add the item on the page only if the current page is the ALl projects page, or the correct project page

  save();
}

function deleteItem(id){
  const item = master.findItemFromID(id);
  master.removeItem(item);

  const projWrap = document.querySelector(".project-wrapper");
  const ul = projWrap.querySelector("ul");
  const liItems = ul.querySelectorAll("li");

  liItems.forEach(li => {
    if(li.getAttribute("data-id") === id){
      ul.removeChild(li);
    }
  });

  save();
}

function save(){
  localStorage.setItem("master", JSON.stringify(master));
}

// date tests
test();