import { createAndAppendText, createLabel, setFieldAttributes, createWithClass, createOption } from "../helpers";
import { getToday } from "../time";

export default function editItem(projects,item){
  const projNames = [...projects].map(proj => {
    return proj.getTitle();
  });
  const modal = document.createElement("dialog");
  modal.classList.add("modal", "edit-item-modal");

  
  const form = document.createElement("form");
  createAndAppendText("h3",form, "Edit Task");

  // Add the title field
  const titleDiv = createWithClass("div","edit-title-div");
  const titleLabel = createLabel("Title", "edit-title");
  titleDiv.appendChild(titleLabel);
  const titleField = document.createElement("input");
  setFieldAttributes(titleField,"text","edit-title","title");
  titleField.required = true;
  titleField.setAttribute("pattern",".+");
  titleField.value = item.getTitle();
  titleDiv.appendChild(titleField);
  form.appendChild(titleDiv);

  //Add the due date field
  const dueDiv = createWithClass("div", "edit-due-div");
  const dueDateLabel = createLabel("Due date", "edit-due");
  dueDiv.appendChild(dueDateLabel);
  const dueDateField = document.createElement("input");
  setFieldAttributes(dueDateField,"date","edit-due","due-date");
  if(item.getDueDate() !== "Never"){
    dueDateField.value = item.getDueDate();
  }
  dueDateField.setAttribute("min", getToday());
  dueDiv.appendChild(dueDateField);
  form.appendChild(dueDiv);

  // Add text area
  const areaDiv = createWithClass("div", "edit-area-div");
  const areaLabel = createLabel("Description", "edit-description");
  areaDiv.appendChild(areaLabel);
  const areaField = document.createElement("textarea");
  areaField.setAttribute("id", "edit-description");
  areaField.setAttribute("name", "description");
  if(item.getDescription() === ""){
    areaField.setAttribute("placeholder", "No description...");
  }
  else{
    areaField.value = item.getDescription();
  }
  areaField.setAttribute("rows","7");
  areaField.setAttribute("maxlength", "130");
  areaDiv.appendChild(areaField);
  form.appendChild(areaDiv);

  // Add priority field
  const priorityDiv = createWithClass("div", "edit-priority-div");
  const priorityLabel = createLabel("Priority", "edit-priority");
  priorityDiv.appendChild(priorityLabel);
  const priorityField = document.createElement("select");
  priorityField.setAttribute("id","edit-priority");
  priorityField.setAttribute("name","priority");
  const lowOption = createOption("low",false);
  const midOption = createOption("medium", false);
  const highOption = createOption("high", false);
  switch (item.getPriority()){
    case "low":
      lowOption.selected = true;
      break;
    case "medium" :
      midOption.selected = true;
      break;
    case "high" :
      highOption.selected = true;
      break;
  }
  priorityField.appendChild(lowOption);
  priorityField.appendChild(midOption);
  priorityField.appendChild(highOption);
  priorityDiv.appendChild(priorityField);
  form.appendChild(priorityDiv);

  //Add the buttons
  const buttonsDiv = createWithClass("div", "edit-modal-buttons-div");
  const cancel = createWithClass("button","edit-modal-cancel", "Cancel");
  const edit = createWithClass("button","edit-modal-add", "Edit Item");
  buttonsDiv.appendChild(cancel);
  buttonsDiv.appendChild(edit);
  form.appendChild(buttonsDiv);

  modal.appendChild(form);
  return modal;
}