import { createWithClass, createAndAppendText } from "../helpers"

export default function today(master){
  const content = createWithClass("div", "today");
  createAndAppendText("h1",content,"Today");

  return content;
}