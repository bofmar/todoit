import { createWithClass, createAndAppendText, createProjectLi } from "../helpers";

export default function projectPanel(projects){
  const content = createWithClass("div","project-wrapper");
  const itemsList = projects.getItemsList();

  const div = createWithClass("div", "title-div", "");

  createAndAppendText("h2",div,projects.getTitle());
  const info = createWithClass("button","project-info","?");
  div.appendChild(info);
  content.appendChild(div);

  //create the field titles
  const divFields = createWithClass("div", "fields");
  content.appendChild(divFields);
  const titleDiv = createWithClass("div", "title-and-sort");
  divFields.appendChild(titleDiv);
  createAndAppendText("span",titleDiv,"Name");
  const sortName = createWithClass("button","sort-by-name","Sort");
  sortName.setAttribute("data-direction","up"); // sorting goes up by default;
  titleDiv.appendChild(sortName);
  createAndAppendText("span",titleDiv,"Due date");
  const sortDate = createWithClass("button","sort-by-date","Sort");
  sortName.setAttribute("data-direction","up"); // sorting goes up by default;
  titleDiv.appendChild(sortDate);  

  const ul = createWithClass("ul","items-list");
  createProjectLi(ul,itemsList);
  content.appendChild(ul);

  const addButton = createWithClass("button", "add-item-button","Add item");
  content.appendChild(addButton);

  return content;
}