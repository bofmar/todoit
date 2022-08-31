export default function projectDetails(project) {
  const modal = document.createElement("dialog");
  modal.classList.add("modal", "project-details-modal");

  const title = document.createElement("h3");
  title.innerText = project.getTitle();
  modal.appendChild(title);

  const description = document.createElement("p");
  description.innerText = project.getDescription() || "No description...";
  modal.appendChild(description);

  const button = document.createElement("button");
  button.innerText = "OK";
  modal.appendChild(button);

  return modal;
}
