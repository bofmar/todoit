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
  itemsLength(){
    return this.#itemsList.length;
  }
  addItem(item){
    this.#itemsList.push(item);
  }
  removeItem(item){
    const index = this.#itemsList.findIndex(toDoItem => toDoItem.getID() === item.getID()); // find the index of the element we want to remove
    if(index === -1) return; // see if we found the element
    this.#itemsList.splice(index,1);
  }
  readItem(item){
    const index = this.#itemsList.findIndex(toDoItem => toDoItem.getID() === item.getID());
    if(index === -1) return; // see if we found the element
    return this.getItemsList()[index];
  }

  // projects methods
  projectsLength(){
    return this.#projectsList.length;
  }
  addProject(project){
    this.#projectsList.push(project);
  }
  removeProject(project){
    const index = this.#projectsList.findIndex(toDoItem => toDoItem.getID() === project.getID()); // find the index of the element we want to remove
    if(index === -1) return; // see if we found the element
    this.#projectsList.splice(index,1);
  }
  readProject(project){
    const index = this.#projectsList.findIndex(toDoItem => toDoItem.getID() === project.getID()); // find the index of the element we want to remove
    if(index === -1) return; // see if we found the element
    return this.#projectsList()[index];
  }
}