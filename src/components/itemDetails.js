import { capitalize } from "../helpers";

export default function itemDetails(item) {
  const modal = document.createElement("dialog");
  modal.classList.add("modal", "item-details-modal");

  const title = document.createElement("h3");
  title.innerText = item.getTitle();
  modal.appendChild(title);

  const description = document.createElement("p");
  description.innerText = item.getDescription();
  modal.appendChild(description);

  const due = document.createElement("p");
  due.innerText = `Due date: ${item.getDueDate()}`;
  modal.appendChild(due);

  const priority = document.createElement("p");
  priority.innerText = `Priority: ${capitalize(item.getPriority())}`;
  modal.appendChild(priority);

  const button = document.createElement("button");
  button.innerText = "OK";
  modal.appendChild(button);

  return modal;
}
