import { createAndAppendText, createLabel, setFieldAttributes, createWithClass, createOption } from "../helpers";
import { getToday } from "../time";

export default function editProject(project){
  const modal = document.createElement("dialog");
  modal.classList.add("modal", "edit-project-modal");

  createAndAppendText("h3",modal, "Edit Project");

  const form = document.createElement("form");

  // Add the title field
  const titleDiv = createWithClass("div","edit-title-div");
  const titleLabel = createLabel("Title", "edit-title");
  titleDiv.appendChild(titleLabel);
  const titleField = document.createElement("input");
  setFieldAttributes(titleField,"text","edit-title","title");
  titleField.required = true;
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
  // TODO set max size, max characters with css
  areaDiv.appendChild(areaField);
  form.appendChild(areaDiv);

  //Add the buttons
  const buttonsDiv = createWithClass("div", "edit-modal-buttons-div");
  const cancel = createWithClass("button","edit-modal-cancel", "Cancel");
  const edit = createWithClass("button","edit-modal-add", "Edit Project");
  buttonsDiv.appendChild(cancel);
  buttonsDiv.appendChild(edit);
  form.appendChild(buttonsDiv);

  modal.appendChild(form);
  return modal;
}