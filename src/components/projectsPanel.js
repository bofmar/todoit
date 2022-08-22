import { createWithClass, createAndAppendText, createProjectLi } from "../helpers";

export default function projectPanel(projects){
  const content = createWithClass("div","project-wrapper");
  const itemsList = projects.getItemsList();

  const div = createWithClass("div", "title-div", "");

  createAndAppendText("h2",div,projects.getTitle());
  const info = createWithClass("button","project-info","?");
  div.appendChild(info);
  content.appendChild(div);

  const ul = createWithClass("ul","items-list");
  createProjectLi(ul,itemsList);
  content.appendChild(ul);

  const addButton = createWithClass("button", "add-item-button","Add item");
  content.appendChild(addButton);

  return content;
}