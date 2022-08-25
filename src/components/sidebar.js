import { createAndAppendText, createWithClass, createNavProjectLi, createDefaultNavLi } from "../helpers";
import Icon from "/src/assets/svg/logo.svg";

export default function sidebar(projects){
  const content = createWithClass("nav","sidebar");

  const title = createWithClass("div","todoit");
  const logo = new Image();
  logo.src = Icon;
  title.appendChild(logo);  
  createAndAppendText("h1",title,"todo-It");


  content.appendChild(title);
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