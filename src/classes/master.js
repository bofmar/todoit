import Project from "./project";
import toDoItem from "./todo";

export default class MasterProject{
  #title;
  #itemsList;
  #projectsList;
  #description;

  constructor(itemsList,projectsList){
    this.#title = "Home";
    this.#description = "Description"; //TODO: Add proper description text here;
    this.#itemsList = itemsList || [];
    this.#projectsList = projectsList || [];
  }

  // geters
  getTitle(){
    return this.#title;
  }
  getItemsList(){
    return this.#itemsList;
  }
  getProjectsList(){
    return this.#projectsList;
  }
  getDescription(){
    return this.#description;
  }

  // items methods  
  createItem(title,dueDate,description,priority,projectID = null){
    const newItem = new toDoItem(title,dueDate,description,priority,false); // new items are always created with done === false
    this.addItem(newItem);

    if(projectID === null) return; // we are done

    const projIndex = this.getProjectsList().findIndex(project => project.getID() === projectID);
    if(projIndex === -1){
      console.error(`No project with id ${projectID} found`);
      return;
    }
    this.getProjectsList()[projIndex].addItem(newItem);
  } // creates a new item and appends it to the master list and the secondary project if one is defined

  itemsLength(){
    return this.#itemsList.length;
  }
  addItem(item){
    this.#itemsList.push(item);
  }
  removeItem(item){
    const index = this.#itemsList.findIndex(toDoItem => toDoItem.getID() === item.getID()); // find the index of the element we want to remove
    if(index === -1) return; // see if we found the element
    
    // see if the item exists in any other project and remove it
    this.#projectsList.forEach(project => {
      project.removeItem(item);
    });

    this.#itemsList.splice(index,1);
  }
  readItem(item){
    const index = this.#itemsList.findIndex(toDoItem => toDoItem.getID() === item.getID());
    if(index === -1) return; // see if we found the element
    return this.getItemsList()[index];
  }

  // projects methods
  createProject(title,itemList,description){
    const newPro = new Project(title,itemList,description);
    this.addProject(newPro);
  }
  projectsLength(){
    return this.#projectsList.length;
  }
  addProject(project){
    this.#projectsList.push(project);
  }
  removeProject(project){
    const index = this.#projectsList.findIndex(toDoItem => toDoItem.getID() === project.getID()); // find the index of the element we want to remove
    if(index === -1) return; // see if we found the element

    // removing a project should remove all items associated with it
    const projectToRemove = this.getProjectsList()[index];
    for(let i = 0; i < projectToRemove.length();){
      this.removeItem(projectToRemove.getItemsList()[i]);
    }

    // finally, remove the project
    this.#projectsList.splice(index,1);
  }
  readProject(project){
    const index = this.#projectsList.findIndex(toDoItem => toDoItem.getID() === project.getID()); // find the index of the element we want to remove
    if(index === -1) return; // see if we found the element
    return this.#projectsList[index];
  }
}