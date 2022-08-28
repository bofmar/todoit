import github from "/src/assets/svg/github.svg";
import codepen from "/src/assets/svg/codepen.svg";

export default function footerComp(){
  const content = document.createElement("footer");
  
  const text = document.createElement("h3");
  text.innerText = "Created by Marios Mpofilakis";
  content.appendChild(text);

  const socials = document.createElement("div");
  content.appendChild(socials);
  
  createSocial(socials,"https://github.com/bofmar","github",github);
  createSocial(socials,"https://codepen.io/bofmar","codepen",codepen);

  return content;
}

function createSocial(parent,href,id,icon){
  const social = document.createElement("a");
  social.setAttribute("href",href);
  social.setAttribute("target", "_blank");
  social.setAttribute("id",id);

  const newIcon = new Image();
  newIcon.src = icon;
  social.appendChild(newIcon);

  parent.appendChild(social);
}