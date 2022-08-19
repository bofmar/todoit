import { createWithClass, createAndAppendText } from "../helpers"

export default function upcoming(master){
  const content = createWithClass("div", "today");
  createAndAppendText("h1",content,"Upcoming");

  return content;
}