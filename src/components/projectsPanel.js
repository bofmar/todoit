import { createWithClass, createAndAppendText, createProjectLi } from "../helpers";

export default function projectPanel(project){
  const content = createWithClass("div","project-wrapper");
  const itemsList = project.getItemsList();

  createAndAppendText("h2",content,project.getTitle());

  const ul = createWithClass("ul","items-list");
  createProjectLi(ul,itemsList);
  content.appendChild(ul);

  const addButton = createWithClass("button", "add-item-button","Add item");
  content.appendChild(addButton);

  return content;
}