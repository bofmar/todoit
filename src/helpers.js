import trash from "/src/assets/svg/delete.svg";
import edit from "/src/assets/svg/edit.svg";
import { isExpired } from "./time";

export function createAndAppendText(type,target,message){
  const text = document.createElement(type);
  text.innerText = message;
  target.appendChild(text);
}

export function createWithClass(type,className,message = ""){
  const newElement = document.createElement(type);
  newElement.classList.add(className);
  newElement.innerText = message;

  return newElement;
}

export function createAndAppendImage(path,target,name){
  const image = new Image();
  image.src = path;
  image.classList.add(name);
  target.appendChild(image);
}

export function createDefaultNavLi(target,arr){
  for(let i = 0; i < arr.length; i++){
    const newLi = document.createElement("li");
    const navButton = createWithClass("button", "nav-button", arr[i]);
    newLi.appendChild(navButton);
    target.appendChild(newLi);
  }
}

export function createNavProjectLi(target, projects){
  const projNames = [...projects].map(proj => {
    return proj.getTitle();
  }); // create an array with the project names

  for(let i = 0; i < projNames.length; i++){
    const newLi = document.createElement("li");
    newLi.classList.add("proj-li");
    newLi.setAttribute("data-id", projects[i].getID());
    const navButton = createWithClass("button", "nav-button", projNames[i]); // use the projNames Array to generate the buttons with the correct text.
    navButton.setAttribute("id", projects[i].getID()); // add the project's id to the co-responding button, so it can be referenced by it.
    const editButton = createWithClass("button","edit-nav");
    const editIcon = new Image();
    editIcon.src = edit;
    editButton.appendChild(editIcon);

    const deleteButton = createWithClass("button","delete-nav");
    const delIcon = new Image();
    delIcon.src = trash;
    deleteButton.appendChild(delIcon);  


    newLi.appendChild(navButton);
    newLi.appendChild(editButton);
    newLi.appendChild(deleteButton);
    target.appendChild(newLi);
  }
}

export function createProjectLi(target, arr){
  for(let i = 0; i < arr.length; i++){
    const newLi = document.createElement("li");
    if(arr[i].isDone()){
      newLi.classList.add("done");
    }
    newLi.setAttribute("data-id", arr[i].getID());
    createAndAppendText("button",newLi,arr[i].getTitle());
    if(isExpired(arr[i]) === true && arr[i].isDone() === false){
      newLi.lastChild.classList.add("expired");
    }
    createAndAppendText("button",newLi,"Details");
    createAndAppendText("span",newLi,arr[i].getDueDate());
    createAndAppendText("button",newLi,"Edit");
    createAndAppendText("button",newLi,"Delete");
    target.appendChild(newLi);
  }
}

export function createLabel(text,forAttr){
  const label = document.createElement("label");
  label.innerText = text;
  label.htmlFor = forAttr;
  return label;
}

export function setFieldAttributes(field,type,id,name){
  field.setAttribute("type", type);
  field.setAttribute("id", id);
  field.setAttribute("name", name);
}

export function createOption(value,selected){
  const option = document.createElement("option");
  option.setAttribute("value",value);
  option.selected = selected;
  option.innerText = value.charAt(0).toUpperCase() + value.slice(1);

  return option;
}

export function capitalize(str){
  return str.replace(/\b\w/g, l => l.toUpperCase());
}