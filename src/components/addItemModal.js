import { createAndAppendText, createLabel, setFieldAttributes, createWithClass, createOption } from "../helpers";
import { getToday } from "../time";

export default function addItemModal(projects,currentPage){
  const projNames = [...projects].map(proj => {
    return proj.getTitle();
  });
  const modal = document.createElement("dialog");
  modal.classList.add("modal", "add-item-modal");

  
  const form = document.createElement("form");
  createAndAppendText("h3",form, "New Task");

  // Add the title field
  const titleDiv = createWithClass("div","item-title-div");
  const titleLabel = createLabel("Title", "item-title");
  titleDiv.appendChild(titleLabel);
  const titleField = document.createElement("input");
  setFieldAttributes(titleField,"text","item-title","title");
  titleField.setAttribute("pattern",".+");
  titleField.setAttribute("maxlength", "30");
  titleField.required = true;
  titleDiv.appendChild(titleField);
  form.appendChild(titleDiv);

  //Add the due date field
  const dueDiv = createWithClass("div", "item-due-div");
  const dueDateLabel = createLabel("Due date", "item-due");
  dueDiv.appendChild(dueDateLabel);
  const dueDateField = document.createElement("input");
  setFieldAttributes(dueDateField,"date","item-due","due-date");
  dueDateField.setAttribute("min", getToday());
  dueDiv.appendChild(dueDateField);
  form.appendChild(dueDiv);

  // Add text area
  const areaDiv = createWithClass("div", "item-area-div");
  const areaLabel = createLabel("Description", "item-description");
  areaDiv.appendChild(areaLabel);
  const areaField = document.createElement("textarea");
  areaField.setAttribute("id", "item-description");
  areaField.setAttribute("name", "description");
  areaField.setAttribute("placeholder", "No description...");
  areaField.setAttribute("rows","7");
  areaField.setAttribute("maxlength", "130");
  areaDiv.appendChild(areaField);
  form.appendChild(areaDiv);

  // Add priority field
  const priorityDiv = createWithClass("div", "item-priority-div");
  const priorityLabel = createLabel("Priority", "item-priority");
  priorityDiv.appendChild(priorityLabel);
  const priorityField = document.createElement("select");
  priorityField.setAttribute("id","item-priority");
  priorityField.setAttribute("name","priority");
  const defaultOption = createOption("low",true);
  const midOption = createOption("medium", false);
  const highOption = createOption("high", false);
  priorityField.appendChild(defaultOption);
  priorityField.appendChild(midOption);
  priorityField.appendChild(highOption);
  priorityDiv.appendChild(priorityField);
  form.appendChild(priorityDiv);

  // Add project field
  const projDiv = createWithClass("div", "item-project-div");
  const projLabel = createLabel("Project", "item-project");
  projDiv.appendChild(projLabel);
  const projField = document.createElement("select");
  projField.setAttribute("id", "item-project");
  projField.setAttribute("name", "project");
  const defaultProj = createOption("none", true);
  projField.appendChild(defaultProj);
  for(let i = 0; i < projNames.length; i++){
    const nextOption = createOption(projNames[i].toLowerCase(), false);
    nextOption.setAttribute("value",projects[i].getID());
    if(nextOption.value === currentPage){
      defaultProj.selected = false;
      nextOption.selected = true;
    }
    projField.appendChild(nextOption);
  }
  projDiv.appendChild(projField);
  form.appendChild(projDiv);

  //Add the buttons
  const buttonsDiv = createWithClass("div", "item-modal-buttons-div");
  const cancel = createWithClass("button","item-modal-cancel", "Cancel");
  const add = createWithClass("button","item-modal-add", "Add Item");
  buttonsDiv.appendChild(cancel);
  buttonsDiv.appendChild(add);
  form.appendChild(buttonsDiv);

  modal.appendChild(form);
  return modal;
}