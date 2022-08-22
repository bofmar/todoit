import { createAndAppendText, createWithClass, createNavProjectLi, createDefaultNavLi } from "../helpers";

export default function sidebar(projects){
  const content = createWithClass("nav","sidebar");
  const unorderedList = document.createElement("ul");
  content.appendChild(unorderedList);

  const defaultNamesList = ["All Projects", "Today", "Upcoming"];

  createDefaultNavLi(unorderedList,defaultNamesList);
  
  const projLi = document.createElement("li");
  createAndAppendText("h2",projLi,"Projects");
  unorderedList.appendChild(projLi);

  createNavProjectLi(unorderedList,projects);

  const addButton = document.createElement("button");
  addButton.classList.add("add-project-button");
  addButton.innerText = "New project";

  content.appendChild(addButton);

  return content;
}