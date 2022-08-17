import toDoItem from "./classes/todo.js";

const testItem = new toDoItem("Make cake","1/1/22","Making cakes is awesome", "Low", false);

console.log(testItem);

testItem.setTitle("Make cake 2");
console.log(testItem.getTitle());
testItem.flipDone();
console.log(testItem.isDone());

console.log(JSON.stringify(testItem));