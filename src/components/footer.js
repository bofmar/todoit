export default function footerComp(){
  const content = document.createElement("footer");
  
  const text = document.createElement("h3");
  text.innerText = "Created by Marios Mpofilakis";
  content.appendChild(text);

  const socials = document.createElement("div");
  content.appendChild(socials);
  
  const gitHub = document.createElement("a");
  gitHub.setAttribute("href","https://github.com/bofmar");
  gitHub.setAttribute("target", "blank");
  gitHub.innerText = "github";
  socials.appendChild(gitHub);

  const codePen = document.createElement("a");
  codePen.setAttribute("href","https://codepen.io/bofmar");
  codePen.innerText = "codePen";
  socials.appendChild(codePen);

  const linkedIn = document.createElement("a");
  linkedIn.setAttribute("href", "https://www.linkedin.com/in/marios-mpofilakis-03a1651b6/");
  linkedIn.innerText = "linkedin";
  socials.appendChild(linkedIn);

  return content;
}