export default class ToDoItem {
  #title;

  #dueDate;

  #description;

  #priority;

  #done;

  #id;

  constructor(title, dueDate, description, priority, id, done) {
    this.#title = title;
    this.#dueDate = dueDate;
    this.#description = description;
    this.#priority = priority;
    this.#done = done;
    this.#id = id || crypto.randomUUID(); // ES6 crypto API to generate the ID
  }

  // geters
  getTitle() {
    return this.#title;
  }

  getDueDate() {
    return this.#dueDate;
  }

  getDescription() {
    return this.#description;
  }

  getPriority() {
    return this.#priority;
  }

  getID() {
    return this.#id;
  }

  isDone() {
    return this.#done;
  }

  // seters
  setTitle(newTitle) {
    this.#title = newTitle;
  }

  setDueDate(newDate) {
    this.#dueDate = newDate;
  }

  setDescription(newDescription) {
    this.#description = newDescription;
  }

  setPriority(newPriority) {
    this.#priority = newPriority;
  }

  flipDone() {
    this.#done = !this.#done;
  }

  toJSON() {
    return {
      title: this.getTitle(),
      dueDate: this.getDueDate(),
      description: this.getDescription(),
      priority: this.getPriority(),
      done: this.isDone(),
      id: this.getID(),
    };
  }
}
