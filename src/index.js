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
import itemDetails from "./components/itemDetails.js";
import editItem from "./components/editItem.js";
import addProject from "./components/addProject.js";
// APIs
import { createProjectLi, createNavProjectLi } from "./helpers.js";
import test from "./time.js";

const body = document.querySelector("body");
const master = new MasterProject();
master.parseFromJSON(localStorage.master);

body.appendChild(sidebar(master.getProjectsList()));

const addItemModalDOM = addItemModal(master.getProjectsList());
body.appendChild(addItemModalDOM);
const addItemForm = addItemModalDOM.querySelector("form");

const addProjectModal = addProject();
body.appendChild(addProjectModal);
const addProjectForm = addProjectModal.querySelector("form");

const formErrorModal = formError();
body.appendChild(formErrorModal);

let currentPage = "All Projects";

(function initialize(){
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

  document.querySelector(".add-project-button").addEventListener("click", ()=> {
    addProjectModal.showModal();
  }); // pop the add project dialogue

  document.querySelector(".project-modal-cancel").addEventListener("click", (e)=> {
    e.preventDefault();
    addProjectForm.reset();
    addProjectModal.close();
  }); // hook the cancel button in the add project dialogue modal

  document.querySelector(".project-modal-add").addEventListener("click", (e)=> {
    e.preventDefault();
    const result = {
      title: document.getElementById("project-title").value,
      description: document.getElementById("project-description").value,
    }

    if(result.title === ""){
      formErrorModal.showModal();
      return;
    }

    addProj(result);
    addProjectForm.reset();
    addProjectModal.close();
  }); // hook the add button in the add project dialogue modal
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
    buttonsList[0].addEventListener("click", ()=> {
      changeDone(id);
    });
    // Second element is the details. Clicking it will bring up a modal that states the description.
    buttonsList[1].addEventListener("click", ()=>{
      popItemDetails(id);
    });
    // Third element is the edit button. Clicking it will bring up the change dialogue.
    buttonsList[2].addEventListener("click", ()=> {
      editItems(id);
    });

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

    newLiButtons[0].addEventListener("click", ()=> {
      changeDone(newItem.getID());
    });

    newLiButtons[1].addEventListener("click", ()=>{
      popItemDetails(newItem.getID());
    });

    newLiButtons[2].addEventListener("click", ()=> {
      editItems(newItem.getID());
    });

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

function popItemDetails(id){
  const itemDetailsModal = itemDetails(master.findItemFromID(id));
  body.appendChild(itemDetailsModal);
  itemDetailsModal.showModal();
  itemDetailsModal.querySelector("button").addEventListener("click", ()=> {
    itemDetailsModal.close();
    body.removeChild(itemDetailsModal);
  });
}

function changeDone(id){
  const item = master.findItemFromID(id);
  item.flipDone();
  save();
}

function editItems(id){
  const item = master.findItemFromID(id);
  const editItemModal = editItem(master.getProjectsList(),item);
  body.appendChild(editItemModal);
  editItemModal.showModal();

  editItemModal.querySelector(".edit-modal-cancel").addEventListener("click", (e)=> {
    e.preventDefault();
    editItemModal.close();
    body.removeChild(editItemModal);
  });

  editItemModal.querySelector(".edit-modal-add").addEventListener("click", (e)=>{
    e.preventDefault();
    const result = {
      title: document.getElementById("edit-title").value,
      date: document.getElementById("edit-due").value,
      description: document.getElementById("edit-description").value,
      priority: document.getElementById("edit-priority").value,
    }
    if(result.title === ""){
      formErrorModal.showModal();
      return;
    }
    if(result.date === "" || result.date === "Never"){
      result.date = "Never";
    }

    item.setTitle(result.title);
    item.setDueDate(result.date);
    item.setDescription(result.description);
    item.setPriority(result.priority);

    const target = document.querySelector(`[data-id = '${id}']`);
    const buttonsList = target.querySelectorAll("button");

    buttonsList[0].innerText = item.getTitle();

    target.querySelector("span").innerText = item.getDueDate();
    console.log(item.getDueDate());

    save();
    editItemModal.close();
    body.removeChild(editItemModal);
  });
}

function addProj(result){
  const newProject = master.createProject(result.title, [], result.description);

  const navbar = document.querySelector("nav");
  const ul = navbar.querySelector("ul");

  createNavProjectLi(ul, [newProject]);

  const newLi = ul.lastChild;
  const newButtons = newLi.querySelectorAll("button");

  newButtons[0].addEventListener("click", ()=> {
    swapPage(newButtons[0]);
  });

  save();
  location.reload();
}

function save(){
  localStorage.setItem("master", JSON.stringify(master));
}

// date tests
test();