export default function deleteWarning(project){
  const modal = document.createElement("dialog");
  modal.classList.add("modal", "delete-warning-modal");

  const title = document.createElement("h3");
  title.innerText = `Are you sure you want to delete ${project.getTitle()} and all associated tasks?`;
  modal.appendChild(title);

  const message = document.createElement("p");
  message.innerText = "Please note that this is irreversible. The project and all tasks will be permanently deleted.";
  modal.appendChild(message);

  
  const cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";
  cancelButton.setAttribute("id","cancel");
  modal.appendChild(cancelButton);

  const okButton = document.createElement("button");
  okButton.innerText = "OK";
  okButton.setAttribute("id","delete");
  modal.appendChild(okButton);

  return modal;
}