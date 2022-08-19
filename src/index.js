import toDoItem from "./classes/todo.js";
import Project from "./classes/project.js";
import MasterProject from "./classes/master.js";
import sidebar from "./components/sidebar.js";
import projectPanel from "./components/projectsPanel.js";
import { createProjectLi } from "./helpers.js";

const testItem = new toDoItem("Make cake","1/1/22","Making cakes is awesome", "Low", false);

console.log(testItem);

testItem.setTitle("Make cake 2");
console.log(testItem.getTitle());
testItem.flipDone();
console.log(testItem.isDone());
console.log(testItem.getID());

const myProject = new Project("Has values",[testItem],"New description");
const emptyProject = new Project("Has no values", null, "Has a description");

myProject.setTitle("Has one value");
console.table(myProject);
console.log(myProject.getDescription());


console.table(emptyProject);
console.log(emptyProject.length());
emptyProject.addItem(testItem);
console.table(emptyProject);
console.log(emptyProject.getItemsList());


const fakeObject = new toDoItem("Make cake33333","1/1/22","Making cakes is awesome", "Low", false);
const newObject1 = new toDoItem("Make cake3","1/1/22","Making cakes is awesome", "Low", false);
const newObject2 = new toDoItem("Make cake4","1/1/22","Making cakes is awesome", "Low", false);
const newObject3 = new toDoItem("Make cake5","1/1/22","Making cakes is awesome", "Low", false);
const newObject4 = new toDoItem("Make cake6","1/1/22","Making cakes is awesome", "Low", false);

emptyProject.addItem(newObject1);
emptyProject.addItem(newObject2);
emptyProject.addItem(newObject3);
emptyProject.addItem(newObject4);

emptyProject.removeItem(fakeObject);
console.table(emptyProject.getItemsList());

emptyProject.removeItem(newObject3);
console.table(emptyProject.getItemsList());

console.log(emptyProject.readItem(newObject2));

const master = new MasterProject();

master.addItem(testItem);
master.addItem(newObject1);
master.addItem(newObject2);
master.addItem(newObject3);
master.addItem(newObject4);
master.addItem(fakeObject);

master.addProject(myProject);
master.addProject(emptyProject);

console.table(emptyProject.getItemsList());

master.removeItem(fakeObject);
master.removeItem(testItem);

master.createItem("This is a new item", "now", "foo","high");
master.createItem("This one goes to the empty project", "yesterday", "bar", "low", emptyProject.getID());


 
console.clear();
master.createItem("This is a new item", "now", "foo","high","m");

console.table(master.getItemsList());
console.table(emptyProject.getItemsList());



// master.removeProject(emptyProject);
// console.table(master.getItemsList());
master.createProject("New And Improved",null,"A good project");
console.table(master.getProjectsList());

master.getItemsList()[1].setTitle("Awesomer");
console.table(master.getItemsList());
console.table(emptyProject.getItemsList());

const testJSON = JSON.stringify(master);
console.log(testJSON);

console.table(JSON.parse(testJSON));


console.clear();
// console.table(master);
const master2 = new MasterProject();
master2.parseFromJSON(testJSON);
console.table(master2);

master2.getItemsList()[1].setTitle("this should be changed");
console.table(master2.getItemsList());
console.table(master2.getProjectsList()[1].getItemsList());

// DOM stuff


// Actual functionality

(function initialize(){
  const body = document.querySelector("body");
  body.appendChild(sidebar(master.getProjectsList()));
  body.appendChild(projectPanel(master));

  const addItemButton = document.querySelector(".add-item-button");
  addItemButton.addEventListener("click", ()=>{
    addItem(master);
  }); // handle adding items

  const navButtons = document.querySelectorAll(".nav-button");
  navButtons.forEach(button => button.addEventListener("click", ()=> {
    swapPage(master,button,body);
  }));
})();

function swapPage(master,button,body){
  console.log(button.hasAttribute("id"));
  body.removeChild(body.lastChild);

  if(button.hasAttribute("id")){ // we are dealing with a project
    const project = master.findProjectFromID(button.getAttribute("id"));
    body.appendChild(projectPanel(project));
  }
  else{
    const name = button.innerText;
    switch(name) {
      case "All Projects" :
        body.appendChild(projectPanel(master));
        break;
      case "Today" :
        break; //TODO
      case "Upcoming" :
        break; //TODO
    }
  } // one of the default pages was selected
}

function addItem(master,targetProject = null){
  const newItem = master.createItem("Title","One month", "This is a placeholder", "High", null, targetProject?.getID());
  const ul = document.querySelector(".items-list");

  createProjectLi(ul, [newItem]);
}
