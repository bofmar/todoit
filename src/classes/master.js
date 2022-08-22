import Project from "./project";
import toDoItem from "./todo";

export default class MasterProject{
  #title;
  #itemsList;
  #projectsList;
  #description;

  constructor(itemsList = [],projectsList = []){
    this.#title = "All Projects";
    this.#description = "This is your main project in todoIt. All tasks you create can be viewed here.";
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
  createItem(title,dueDate,description,priority,id = null,projectID = null,done = false){
    const newItem = new toDoItem(title,dueDate,description,priority,id,done); // new items are always created with done === false
    this.addItem(newItem);

    if(projectID === null) return newItem; // we are done

    const projIndex = this.getProjectsList().findIndex(project => project.getID() === projectID);
    if(projIndex === -1){
      console.error(`No project with id ${projectID} found`);
      return;
    }
    this.getProjectsList()[projIndex].addItem(newItem);

    return newItem;
  } // creates a new item and appends it to the master list and the secondary project if one is defined

  itemsLength(){
    return this.getItemsList().length;
  }
  addItem(item){
    this.#itemsList.push(item);
  }
  removeItem(item){
    const index = this.getItemsList().findIndex(toDoItem => toDoItem.getID() === item.getID()); // find the index of the element we want to remove
    if(index === -1) return;    
    // see if the item exists in any other project and remove it
    this.#projectsList.forEach(project => {
      project.removeItem(item);
    });

    this.#itemsList.splice(index,1);
  }
  findItemFromID(id){
    const index = this.getItemsList().findIndex(toDoItem => toDoItem.getID() === id);
    if(index === -1) return;
    return this.getItemsList()[index];
  }

  // projects methods
  createProject(title,itemsList,description){
    const newPro = new Project(title,itemsList,description);
    this.addProject(newPro);

    return newPro;
  }
  projectsLength(){
    return this.getProjectsList().length;
  }
  addProject(project){
    this.#projectsList.push(project);
  }
  removeProject(project){
    const index = this.getProjectsList().findIndex(toDoItem => toDoItem.getID() === project.getID()); // find the index of the element we want to remove
    if(index === -1) return;
    // removing a project should remove all items associated with it
    const projectToRemove = this.getProjectsList()[index];
    for(let i = 0; i < projectToRemove.length();){
      this.removeItem(projectToRemove.getItemsList()[i]);
    }

    // finally, remove the project
    this.#projectsList.splice(index,1);
  }
  findProjectFromID(id){
    const index = this.getProjectsList().findIndex(project => project.getID() === id);
    if(index === -1) return;
    return this.getProjectsList()[index];
  }

  // JSON handling
  toJSON(){
    return {
      itemsList: this.getItemsList(),
      projectsList: this.getProjectsList(),
    }
  }

  parseFromJSON(jsonString){
    if(jsonString === undefined){
      return;
    }
    const jsonObject = JSON.parse(jsonString); // parse the JSON string to an object

    for(let i = 0; i < jsonObject.itemsList.length; i++){
      this.recreateItem(jsonObject.itemsList[i]);
    } // put all the items back into master

    for(let i = 0; i < jsonObject.projectsList.length; i++){
      this.recreateProject(jsonObject.projectsList[i]);
    }
  }

  recreateItem(item){
    this.createItem(item.title, item.dueDate, item.description, item.priority, item.id, null, item.done);
  }

  recreateProject(project){
    const list = project.itemsList;

    const newList = list.map(item => {
      return this.findItemFromID(item.id);       
    }); // find the created items and create a list with their references.

    this.createProject(project.title,newList,project.description); // create the new project
  }
}