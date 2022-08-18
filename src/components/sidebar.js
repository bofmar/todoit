import { createAndAppendText, createWithClass, createLi } from "../helpers";

export default function sidebar(projects){
  const content = createWithClass("nav","sidebar");
  const unorderedList = document.createElement("ul");
  content.appendChild(unorderedList);

  const defaultNamesList = ["All Projects", "Today", "Upcoming"];

  createLi(unorderedList,defaultNamesList);
  
  const projLi = document.createElement("li");
  createAndAppendText("h2",projLi,"Projects");
  unorderedList.appendChild(projLi);

  const projectNames = [...projects].map(proj => {
    return proj.getTitle();
  });
  createLi(unorderedList,projectNames);


  return content;
}