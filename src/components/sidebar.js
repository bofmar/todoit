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

  // const projectNames = [...projects].map(proj => {
  //   return proj.getTitle();
  // });
  createNavProjectLi(unorderedList,projects);


  return content;
}