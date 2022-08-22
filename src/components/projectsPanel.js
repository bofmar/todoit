import { createWithClass, createAndAppendText, createProjectLi } from "../helpers";

export default function projectPanel(projects){
  const content = createWithClass("div","project-wrapper");
  const itemsList = projects.getItemsList();

  createAndAppendText("h2",content,projects.getTitle());

  const ul = createWithClass("ul","items-list");
  createProjectLi(ul,itemsList);
  content.appendChild(ul);

  const addButton = createWithClass("button", "add-item-button","Add item");
  content.appendChild(addButton);

  return content;
}