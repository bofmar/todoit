import image from "/src/assets/svg/warning-for-modal.svg";

export default function formError(){
  const modal = document.createElement("dialog");
  modal.classList.add("modal", "form-error-modal");

  const icon = new Image();
  icon.src = image;
  modal.appendChild(icon);

  const title = document.createElement("h3");
  title.innerText = "Validation Error";
  modal.appendChild(title);

  const message = document.createElement("p");
  message.innerText = "Please fill out the mandatory fields";
  modal.appendChild(message);

  const button = document.createElement("button");
  button.innerText = "OK";
  modal.appendChild(button);

  return modal;
}