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

export function createLi(target, arr){
  for(let i = 0; i < arr.length; i++){
    const newLi = document.createElement("li");
    createAndAppendText("button",newLi,arr[i]);
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