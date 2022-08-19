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
    const navButton = createWithClass("button", "nav-button", projNames[i]); // use the projNames Array to generate the buttons with the correct text.
    navButton.setAttribute("id", projects[i].getID()); // add the project's id to the co-responding button, so it can be referenced by it.

    newLi.appendChild(navButton);
    target.appendChild(newLi);
  }
}

export function createProjectLi(target, arr){
  for(let i = 0; i < arr.length; i++){
    const newLi = document.createElement("li");
    createAndAppendText("button",newLi,arr[i].getTitle());
    createAndAppendText("button",newLi,"Details");
    createAndAppendText("button",newLi,arr[i].getDueDate());
    createAndAppendText("button",newLi,"Edit");
    createAndAppendText("button",newLi,"Delete");
    target.appendChild(newLi);
  }
}