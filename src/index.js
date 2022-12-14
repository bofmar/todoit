// OBJECTS
import MasterProject from "./classes/master";
// PAGES
import sidebar from "./components/sidebar";
import projectPanel from "./components/projectsPanel";
import todayPage from "./components/todayPage";
import upcomingPage from "./components/upcomingPage";
import addItemModal from "./components/addItemModal";
import formError from "./components/formError";
import itemDetails from "./components/itemDetails";
import editItem from "./components/editItem";
import addProject from "./components/addProject";
import editProject from "./components/editProject";
import deleteWarning from "./components/deleteWarning";
import projectDetails from "./components/projectDetails";
import footerComp from "./components/footer";
// APIs
import { createProjectLi, createNavProjectLi } from "./helpers";
import {
  getToday,
  filterWithinWeek,
  compare,
  isExpired,
  expiresToday,
  expiresInAWeek,
} from "./time";

import "./styles/sass/index.scss";
import dark from "./assets/svg/dark-mode.svg";
import light from "./assets/svg/light-mode.svg";

const body = document.querySelector("body");
const master = new MasterProject();
master.parseFromJSON(localStorage.master);

body.appendChild(sidebar(master.getProjectsList()));

const addProjectModal = addProject();
body.appendChild(addProjectModal);
const addProjectForm = addProjectModal.querySelector("form");

const themeButton = document.createElement("button");

const footer = footerComp();
body.appendChild(footer);

let currentPage = "All Projects";
let lastTheme = localStorage.getItem("theme") || "light";

function save() {
  localStorage.setItem("master", JSON.stringify(master));
  localStorage.setItem("theme", lastTheme);
}
function changeTheme() {
  body.classList.toggle("dark");
  themeButton.removeChild(themeButton.lastChild);
  const icon = new Image();
  if (lastTheme === "light") {
    lastTheme = "dark";
    icon.src = dark;
  } else {
    lastTheme = "light";
    icon.src = light;
  }
  themeButton.appendChild(icon);
  save();
}

function changeDone(id) {
  const item = master.findItemFromID(id);
  item.flipDone();
  document.querySelector(`[data-id = '${id}']`).classList.toggle("done");

  if (item.isDone()) {
    document
      .querySelector(`[data-id = '${id}']`)
      .firstChild.classList.remove("expired");
    document
      .querySelector(`[data-id = '${id}']`)
      .firstChild.classList.remove("expires-today");
    document
      .querySelector(`[data-id = '${id}']`)
      .firstChild.classList.remove("expires-in-week");
  } else if (isExpired(item)) {
    document
      .querySelector(`[data-id = '${id}']`)
      .firstChild.classList.add("expired");
  } else if (expiresToday(item)) {
    document
      .querySelector(`[data-id = '${id}']`)
      .firstChild.classList.add("expires-today");
  } else if (expiresInAWeek(item)) {
    document
      .querySelector(`[data-id = '${id}']`)
      .firstChild.classList.add("expires-in-week");
  }
  save();
}

function popItemDetails(id) {
  const itemDetailsModal = itemDetails(master.findItemFromID(id));
  body.appendChild(itemDetailsModal);
  itemDetailsModal.showModal();
  itemDetailsModal.querySelector("button").addEventListener("click", () => {
    itemDetailsModal.close();
    body.removeChild(itemDetailsModal);
  });
}

function editItems(id) {
  const item = master.findItemFromID(id);
  const editItemModal = editItem(master.getProjectsList(), item);
  body.appendChild(editItemModal);
  editItemModal.showModal();

  editItemModal
    .querySelector(".edit-modal-cancel")
    .addEventListener("click", (e) => {
      e.preventDefault();
      editItemModal.close();
      body.removeChild(editItemModal);
    });

  editItemModal
    .querySelector(".edit-modal-add")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const result = {
        title: document.getElementById("edit-title").value,
        date: document.getElementById("edit-due").value,
        description: document.getElementById("edit-description").value,
        priority: document.getElementById("edit-priority").value,
      };
      if (result.title === "") {
        const formErrorModal = formError();
        body.appendChild(formErrorModal);
        formErrorModal
          .querySelector("button")
          .addEventListener("click", (e) => {
            e.preventDefault();
            formErrorModal.close();
            body.removeChild(formErrorModal);
          }); // hook the ok button in the form error modal
        formErrorModal.showModal();
        return;
      }
      if (result.date === "" || result.date === "Never") {
        result.date = "Never";
      }

      item.setTitle(result.title);
      item.setDueDate(result.date);
      item.setDescription(result.description);
      item.setPriority(result.priority);

      const target = document.querySelector(`[data-id = '${id}']`);
      if (result.priority === "high") {
        target.classList.add("ph");
        target.classList.remove("pm");
        target.classList.remove("pl");
      } else if (result.priority === "medium") {
        target.classList.remove("ph");
        target.classList.add("pm");
        target.classList.remove("pl");
      } else {
        target.classList.remove("ph");
        target.classList.remove("pm");
        target.classList.add("pl");
      }
      const buttonsList = target.querySelectorAll("button");

      buttonsList[0].innerText = item.getTitle();

      target.querySelector("span").innerText = item.getDueDate();

      save();
      editItemModal.close();
      body.removeChild(editItemModal);
    });
}

function deleteItem(id) {
  const item = master.findItemFromID(id);
  master.removeItem(item);

  const projWrap = document.querySelector(".project-wrapper");
  const ul = projWrap.querySelector("ul");
  const liItems = ul.querySelectorAll("li");

  liItems.forEach((li) => {
    if (li.getAttribute("data-id") === id) {
      ul.removeChild(li);
    }
  });

  save();
}

function addItem(proj) {
  const newItem = master.createItem(
    proj.title,
    proj.date,
    proj.description,
    proj.priority,
    null,
    proj.project === "none" ? null : proj.project
  );
  if (currentPage === "All Projects" || currentPage === proj.project) {
    const ul = document.querySelector(".items-list");
    createProjectLi(ul, [newItem]);
    const newLi = ul.lastChild;
    const newLiButtons = newLi.querySelectorAll("button");

    newLiButtons[0].addEventListener("click", () => {
      changeDone(newItem.getID());
    });

    newLiButtons[1].addEventListener("click", () => {
      popItemDetails(newItem.getID());
    });

    newLiButtons[2].addEventListener("click", () => {
      editItems(newItem.getID());
    });

    newLiButtons[3].addEventListener("click", () => {
      deleteItem(newItem.getID());
    });
  }
  /* add the item on the page only if the current page is the ALl projects page,
     or the correct project page */

  save();
}

function sortByName(e) {
  const direction = e.target.parentNode.getAttribute("data-direction");
  let sortedItems = [];

  if (currentPage === "All Projects") {
    sortedItems = master.getItemsList().sort((a, b) => {
      if (direction === "up") {
        return a.getTitle() > b.getTitle() ? 1 : -1;
      }

      return a.getTitle() > b.getTitle() ? -1 : 1;
    });
  } else {
    const project = master.findProjectFromID(currentPage);
    sortedItems = project.getItemsList().sort((a, b) => {
      if (direction === "up") {
        return a.getTitle() > b.getTitle() ? 1 : -1;
      }

      return a.getTitle() > b.getTitle() ? -1 : 1;
    });
  }

  const title = document
    .querySelector(".title-div")
    .querySelector("h2").innerText;
  body.removeChild(body.lastChild);
  body.appendChild(projectPanel(sortedItems, title));

  if (direction === "up") {
    document
      .querySelector(".sort-by-name")
      .setAttribute("data-direction", "down");
  } else {
    document
      .querySelector(".sort-by-name")
      .setAttribute("data-direction", "up");
  }
  hookButtons();
}

function sortByDate(e) {
  const direction = e.target.parentNode.getAttribute("data-direction");
  let sortedItems = [];
  if (currentPage === "All Projects") {
    sortedItems = master.getItemsList().sort((a, b) => {
      if (direction === "up") {
        return compare(b, a);
      }

      return compare(a, b);
    });
  } else {
    const project = master.findProjectFromID(currentPage);
    sortedItems = project.getItemsList().sort((a, b) => {
      if (direction === "up") {
        return compare(b, a);
      }

      return compare(a, b);
    });
  }

  const title = document
    .querySelector(".title-div")
    .querySelector("h2").innerText;
  body.removeChild(body.lastChild);
  body.appendChild(projectPanel(sortedItems, title));

  if (direction === "up") {
    document
      .querySelector(".sort-by-date")
      .setAttribute("data-direction", "down");
  } else {
    document
      .querySelector(".sort-by-date")
      .setAttribute("data-direction", "up");
  }
  hookButtons();
}

function hookButtons() {
  if (currentPage !== "Today" && currentPage !== "Upcoming") {
    document.querySelector(".add-item-button").addEventListener("click", () => {
      const addItemModalDOM = addItemModal(
        master.getProjectsList(),
        currentPage
      );
      body.appendChild(addItemModalDOM);
      const addItemForm = addItemModalDOM.querySelector("form");
      addItemModalDOM.showModal();

      document
        .querySelector(".item-modal-add")
        .addEventListener("click", (e) => {
          e.preventDefault();
          const result = {
            title: document.getElementById("item-title").value,
            date: document.getElementById("item-due").value,
            description: document.getElementById("item-description").value,
            priority: document.getElementById("item-priority").value,
            project: document.getElementById("item-project").value,
          };
          if (result.title === "") {
            const formErrorModal = formError();
            body.appendChild(formErrorModal);
            formErrorModal
              .querySelector("button")
              .addEventListener("click", (e) => {
                e.preventDefault();
                formErrorModal.close();
                body.removeChild(formErrorModal);
              }); // hook the ok button in the form error modal
            formErrorModal.showModal();
            return;
          }
          if (result.date === "") {
            result.date = "Never";
          }
          addItem(result);
          addItemForm.reset();
          addItemModalDOM.close();
          body.removeChild(addItemModalDOM);
        }); // hook the add button in the add item dialogue modal

      document
        .querySelector(".item-modal-cancel")
        .addEventListener("click", (e) => {
          e.preventDefault();
          addItemForm.reset();
          addItemModalDOM.close();
          body.removeChild(addItemModalDOM);
        }); // hook the cancel button in the add item dialogue modal
    }); // the new add item button is hooked

    document.querySelector(".sort-by-name").addEventListener("click", (e) => {
      sortByName(e);
    }); // hook the sort by name button
    document.querySelector(".sort-by-date").addEventListener("click", (e) => {
      sortByDate(e);
    });
  }

  const projWrap = document.querySelector(".project-wrapper");
  const liItems = projWrap.querySelectorAll("li");
  liItems.forEach((li) => {
    const buttonsList = li.querySelectorAll("button");
    const id = li.getAttribute("data-id");

    // First element is the project name. Clicking it will toggle done state.
    buttonsList[0].addEventListener("click", () => {
      changeDone(id);
    });
    // Second element is the details. Clicking it will bring up a modal that states the description.
    buttonsList[1].addEventListener("click", () => {
      popItemDetails(id);
    });
    // Third element is the edit button. Clicking it will bring up the change dialogue.
    buttonsList[2].addEventListener("click", () => {
      editItems(id);
    });

    // Final element is the delete button.Clicking it will remove the element.
    buttonsList[3].addEventListener("click", () => {
      deleteItem(id);
    });
  }); // hook the buttons in the items list

  if (currentPage !== "Today" && currentPage !== "Upcoming") {
    document.querySelector(".project-info").addEventListener("click", () => {
      if (currentPage === "All Projects") {
        const detailsModal = projectDetails(master);
        body.appendChild(detailsModal);
        detailsModal.showModal();

        detailsModal.querySelector("button").addEventListener("click", () => {
          detailsModal.close();
          body.removeChild(detailsModal);
        });
      } else {
        const proj = master.findProjectFromID(currentPage);
        const detailsModal = projectDetails(proj);
        body.appendChild(detailsModal);
        detailsModal.showModal();

        detailsModal.querySelector("button").addEventListener("click", () => {
          detailsModal.close();
          body.removeChild(detailsModal);
        });
      }
    });
  }
}

function findToday() {
  const today = getToday();
  const allItems = master.getItemsList();

  const todayItems = allItems.filter(
    (item) => item.getDueDate() === today && item.isDone() === false
  );

  return todayItems;
}

function swapPage(button) {
  body.removeChild(body.lastChild);

  if (button.hasAttribute("id")) {
    // we are dealing with a project
    const project = master.findProjectFromID(button.getAttribute("id"));
    currentPage = button.getAttribute("id");
    body.appendChild(projectPanel(project));
  } else {
    const name = button.innerText;
    switch (name) {
      case "All Projects":
        currentPage = button.innerText;
        body.appendChild(projectPanel(master));
        break;
      case "Today":
        currentPage = button.innerText;
        body.appendChild(todayPage(findToday()));
        break;
      default:
        currentPage = button.innerText;
        body.appendChild(upcomingPage(filterWithinWeek(master.getItemsList())));
        break;
    }
  } // one of the default pages was selected
  hookButtons();
}

function addProj(result) {
  const newProject = master.createProject(result.title, [], result.description);

  const navbar = document.querySelector("nav");
  const ul = navbar.querySelector("ul");

  createNavProjectLi(ul, [newProject]);

  const newLi = ul.lastChild;
  const newButtons = newLi.querySelectorAll("button");

  newButtons[0].addEventListener("click", () => {
    swapPage(newButtons[0]);
  });

  save();
  location.reload();
}

function editPro(id) {
  const project = master.findProjectFromID(id);
  const editModal = editProject(project);
  body.appendChild(editModal);
  editModal.showModal();

  editModal
    .querySelector(".edit-modal-cancel")
    .addEventListener("click", (e) => {
      e.preventDefault();
      editModal.close();
      body.removeChild(editModal);
    });

  editModal.querySelector(".edit-modal-add").addEventListener("click", (e) => {
    e.preventDefault();
    const result = {
      title: document.getElementById("edit-title").value,
      description: document.getElementById("edit-description").value,
    };
    if (result.title === "") {
      const formErrorModal = formError();
      body.appendChild(formErrorModal);
      formErrorModal.querySelector("button").addEventListener("click", (e) => {
        e.preventDefault();
        formErrorModal.close();
        body.removeChild(formErrorModal);
      }); // hook the ok button in the form error modal
      formErrorModal.showModal();
      return;
    }

    project.setTitle(result.title);
    project.setDescription(result.description);

    const target = document.querySelector(`[data-id = '${id}']`);
    target.firstChild.innerText = project.getTitle();

    save();
    editModal.close();
    body.removeChild(editModal);

    if (currentPage === project.getID()) {
      const div = document.querySelector(".project-wrapper");
      div.querySelector("h2").innerText = project.getTitle();
    }
  });
}

function deletePro(id) {
  const project = master.findProjectFromID(id);

  const deleteModal = deleteWarning(project);
  body.appendChild(deleteModal);

  deleteModal.showModal();

  document.getElementById("cancel").addEventListener("click", () => {
    deleteModal.close();
    body.removeChild(deleteModal);
  });

  document.getElementById("delete").addEventListener("click", () => {
    master.removeProject(project);

    deleteModal.close();
    body.removeChild(deleteModal);
    save();
    location.reload();
  });
}

(function initialize() {
  document.querySelector("title").innerText = "todo-it - A simple todo web app";

  themeButton.classList.add("theme");
  body.appendChild(themeButton);
  themeButton.addEventListener("click", () => {
    changeTheme();
  });

  const themeIcon = new Image();

  if (lastTheme === "dark") {
    body.classList.add("dark");
    themeIcon.src = dark;
  } else {
    themeIcon.src = light;
  }
  themeButton.appendChild(themeIcon);

  body.appendChild(projectPanel(master));

  hookButtons();

  const navButtons = document.querySelectorAll(".nav-button");
  navButtons.forEach((button) =>
    button.addEventListener("click", () => {
      swapPage(button);
    })
  );

  document
    .querySelector(".add-project-button")
    .addEventListener("click", () => {
      addProjectModal.showModal();
    });

  document
    .querySelector(".project-modal-cancel")
    .addEventListener("click", (e) => {
      e.preventDefault();
      addProjectForm.reset();
      addProjectModal.close();
    }); // hook the cancel button in the add project dialogue modal

  document
    .querySelector(".project-modal-add")
    .addEventListener("click", (e) => {
      e.preventDefault();
      const result = {
        title: document.getElementById("project-title").value,
        description: document.getElementById("project-description").value,
      };

      if (result.title === "") {
        const formErrorModal = formError();
        body.appendChild(formErrorModal);
        formErrorModal
          .querySelector("button")
          .addEventListener("click", (e) => {
            e.preventDefault();
            formErrorModal.close();
            body.removeChild(formErrorModal);
          }); // hook the ok button in the form error modal
        formErrorModal.showModal();
        return;
      }

      addProj(result);
      addProjectForm.reset();
      addProjectModal.close();
    }); // hook the add button in the add project dialogue modal

  const projList = document.querySelectorAll(".proj-li");
  projList.forEach((li) => {
    const buttons = li.querySelectorAll("button");
    const id = li.getAttribute("data-id");

    buttons[1].addEventListener("click", () => {
      editPro(id);
    });

    buttons[2].addEventListener("click", () => {
      deletePro(id);
    });
  });
})();
