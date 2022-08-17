import toDoItem from "./classes/todo.js";
import Project from "./classes/project.js";

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

console.clear();
emptyProject.removeItem(fakeObject);
console.table(emptyProject.getItemsList());


emptyProject.removeItem(testItem);
console.table(emptyProject.getItemsList());

emptyProject.removeItem(newObject3);
console.table(emptyProject.getItemsList());

console.log(emptyProject.readItem(newObject2));