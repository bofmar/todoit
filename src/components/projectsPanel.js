import { createWithClass, createAndAppendText, createProjectLi } from "../helpers";

export default function projectPanel(project){
  // h1
  // ul > li > div: button::title, button::details, button::dueDate, button::edit, button::delete

  const itemsList = project.getItemsList();
  console.log(itemsList);

  const content = createWithClass("div","project-wrapper");
  createAndAppendText("h2",content,project.getTitle());

  const ul = createWithClass("ul","items-list");
  createProjectLi(ul,itemsList);
  content.appendChild(ul);

  return content;
}