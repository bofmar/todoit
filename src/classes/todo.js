export default class toDoItem{
  #title;
  #dueDate;
  #description;
  #priority;
  #done;

  constructor(title,dueDate,description,priority,done){
    this.#title = title;
    this.#dueDate = dueDate;
    this.#description = description;
    this.#priority = priority;
    this.#done = done;
  }

  // geters
  getTitle(){
    return this.#title;
  }
  getDueDate(){
    return this.#dueDate;
  }
  getDescription(){
    return this.#description;
  }
  getPriority(){
    return this.#priority;
  }
  isDone(){
    return this.#done;
  }

  //seters
  setTitle(newTitle){
    this.#title = newTitle;
  }
  setDueDate(newDate){
    this.#dueDate = newDate;
  }
  setDescription(newDescription){
    this.#description = newDescription;
  }
  setPriority(newPriority){
    this.#priority = newPriority;
  }
  flipDone(){
    this.#done = !this.#done;
  }
}