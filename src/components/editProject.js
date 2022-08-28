import { createAndAppendText, createLabel, setFieldAttributes, createWithClass, createOption } from "../helpers";
import { getToday } from "../time";

export default function editProject(project){
  const modal = document.createElement("dialog");
  modal.classList.add("modal", "edit-project-modal");

  
  const form = document.createElement("form");
  createAndAppendText("h3",form, "Edit Project");

  // Add the title field
  const titleDiv = createWithClass("div","edit-title-div");
  const titleLabel = createLabel("Title", "edit-title");
  titleDiv.appendChild(titleLabel);
  const titleField = document.createElement("input");
  setFieldAttributes(titleField,"text","edit-title","title");
  titleField.required = true;
  titleField.setAttribute("pattern",".+");
  titleField.value = project.getTitle();
  titleDiv.appendChild(titleField);
  form.appendChild(titleDiv);

  // Add text area
  const areaDiv = createWithClass("div", "edit-area-div");
  const areaLabel = createLabel("Description", "edit-description");
  areaDiv.appendChild(areaLabel);
  const areaField = document.createElement("textarea");
  areaField.setAttribute("id", "edit-description");
  areaField.setAttribute("name", "description");
  if(project.getDescription() === ""){
    areaField.setAttribute("placeholder", "No description...");
  }
  else{
    areaField.value = project.getDescription();
  }
  areaField.setAttribute("rows","7");
  areaDiv.appendChild(areaField);
  form.appendChild(areaDiv);

  //Add the buttons
  const buttonsDiv = createWithClass("div", "edit-modal-buttons-div");
  const cancel = createWithClass("button","edit-modal-cancel", "Cancel");
  const edit = createWithClass("button","edit-modal-add", "Edit");
  buttonsDiv.appendChild(cancel);
  buttonsDiv.appendChild(edit);
  form.appendChild(buttonsDiv);

  modal.appendChild(form);
  return modal;
}