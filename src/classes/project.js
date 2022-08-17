export default class Project{
  #title;
  #itemsList;
  #description;
  #id;

  constructor(title,itemList,description){
    this.#title = title;
    this.#itemsList = itemList || [];
    this.#description = description;
    this.#id = crypto.randomUUID();
  }

  // geters
  getTitle(){
    return this.#title;
  }
  getItemsList(){
    return this.#itemsList;
  }
  getDescription(){
    return this.#description;
  }
  getID(){
    return this.#id;
  }

  // seters
  setTitle(newTitle){
    this.#title = newTitle;
  }
  setDescription(newDescription){
    this.#description = newDescription;
  }

  length(){
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
  removeAll(){
    //this.#itemsList = [];
  }
  readItem(item){
    const index = this.#itemsList.findIndex(toDoItem => toDoItem.getID() === item.getID());
    if(index === -1) return; // see if we found the element
    return this.getItemsList()[index];
  }

  toJSON(){
    return {
      title : this.getTitle(),
      itemsList : this.getItemsList(),
      description : this.getDescription(),
      id: this.getID(),
    }
  }
}