import { createWithClass, createAndAppendText, createProjectLi } from "../helpers";
import Icon from "/src/assets/svg/sort.svg";

export default function projectPanel(projects,title = ""){
  const content = createWithClass("div","project-wrapper");
  const itemsList = projects.getItemsList?.() || projects;

  const div = createWithClass("div", "title-div", "");

  if(title === ""){
    title = projects.getTitle();
  }

  createAndAppendText("h2",div,title);
  const info = createWithClass("button","project-info","?");
  div.appendChild(info);
  content.appendChild(div);

  //create the field titles
  const divFields = createWithClass("div", "fields");
  content.appendChild(divFields);
  const titleDiv = createWithClass("div", "title-and-sort");
  divFields.appendChild(titleDiv);
  createAndAppendText("span",titleDiv,"Name");
  const sortName = createWithClass("button","sort-by-name");
  const sort = new Image();
  sort.src = Icon;
  sortName.appendChild(sort);
  sortName.setAttribute("data-direction","up"); // sorting goes up by default;
  titleDiv.appendChild(sortName);
  
  const dateDiv = createWithClass("div", "date-and-sort");
  divFields.appendChild(dateDiv);
  createAndAppendText("span",dateDiv,"Due date");
  const sortDate = createWithClass("button","sort-by-date");
  const sort2 = new Image();
  sort2.src = Icon;
  sortDate.appendChild(sort2);
  sortDate.setAttribute("data-direction","up"); // sorting goes up by default;
  dateDiv.appendChild(sortDate);

  const ul = createWithClass("ul","items-list");
  createProjectLi(ul,itemsList);
  content.appendChild(ul);

  const addButton = createWithClass("button", "add-item-button","Add item");
  content.appendChild(addButton);

  return content;
}