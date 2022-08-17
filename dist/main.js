(()=>{"use strict";class t{#t;#e;#s;#i;#o;#r;constructor(t,e,s,i,o,r){this.#t=t,this.#e=e,this.#s=s,this.#i=i,this.#o=r,this.#r=o||crypto.randomUUID()}getTitle(){return this.#t}getDueDate(){return this.#e}getDescription(){return this.#s}getPriority(){return this.#i}getID(){return this.#r}isDone(){return this.#o}setTitle(t){this.#t=t}setDueDate(t){this.#e=t}setDescription(t){this.#s=t}setPriority(t){this.#i=t}flipDone(){this.#o=!this.#o}toJSON(){return{title:this.getTitle(),dueDate:this.getDueDate(),description:this.getDescription(),priority:this.getPriority(),done:this.isDone(),id:this.getID()}}}class e{#t;#n;#s;#r;constructor(t,e,s){this.#t=t,this.#n=e||[],this.#s=s,this.#r=crypto.randomUUID()}getTitle(){return this.#t}getItemsList(){return this.#n}getDescription(){return this.#s}getID(){return this.#r}setTitle(t){this.#t=t}setDescription(t){this.#s=t}length(){return this.#n.length}addItem(t){this.#n.push(t)}removeItem(t){const e=this.#n.findIndex((e=>e.getID()===t.getID()));-1!==e&&this.#n.splice(e,1)}removeAll(){}readItem(t){const e=this.#n.findIndex((e=>e.getID()===t.getID()));if(-1!==e)return this.getItemsList()[e]}toJSON(){return{title:this.getTitle(),itemsList:this.getItemsList(),description:this.getDescription(),id:this.getID()}}}class s{#t;#n;#c;#s;constructor(t,e){this.#t="Home",this.#s="Description",this.#n=t||[],this.#c=e||[]}getTitle(){return this.#t}getItemsList(){return this.#n}getProjectsList(){return this.#c}getDescription(){return this.#s}createItem(e,s,i,o,r=null,n=null){const c=new t(e,s,i,o,r,!1);if(this.addItem(c),null===n)return;const a=this.getProjectsList().findIndex((t=>t.getID()===n));-1!==a?this.getProjectsList()[a].addItem(c):console.error(`No project with id ${n} found`)}itemsLength(){return this.#n.length}addItem(t){this.#n.push(t)}removeItem(t){const e=this.#n.findIndex((e=>e.getID()===t.getID()));-1!==e&&(this.#c.forEach((e=>{e.removeItem(t)})),this.#n.splice(e,1))}readItem(t){const e=this.#n.findIndex((e=>e.getID()===t.getID()));if(-1!==e)return this.getItemsList()[e]}findItemFromID(t){const e=this.#n.findIndex((e=>e.getID()===t));if(-1!==e)return this.getItemsList()[e]}createProject(t,s,i){const o=new e(t,s,i);this.addProject(o)}projectsLength(){return this.#c.length}addProject(t){this.#c.push(t)}removeProject(t){const e=this.#c.findIndex((e=>e.getID()===t.getID()));if(-1===e)return;const s=this.getProjectsList()[e];for(let t=0;t<s.length();)this.removeItem(s.getItemsList()[t]);this.#c.splice(e,1)}readProject(t){const e=this.#c.findIndex((e=>e.getID()===t.getID()));if(-1!==e)return this.#c[e]}toJSON(){return{itemList:this.getItemsList(),projectsList:this.getProjectsList()}}parseFromJSON(t){const e=JSON.parse(t);for(let t=0;t<e.itemList.length;t++)this.recreateItem(e.itemList[t]);for(let t=0;t<e.projectsList.length;t++)this.recreateProject(e.projectsList[t])}recreateItem(t){this.createItem(t.title,t.dueDate,t.description,t.priority,t.id)}recreateProject(t){const e=t.itemsList.map((t=>this.findItemFromID(t.id)));this.createProject(t.title,e,t.description)}}const i=new t("Make cake","1/1/22","Making cakes is awesome","Low",!1);console.log(i),i.setTitle("Make cake 2"),console.log(i.getTitle()),i.flipDone(),console.log(i.isDone()),console.log(i.getID());const o=new e("Has values",[i],"New description"),r=new e("Has no values",null,"Has a description");o.setTitle("Has one value"),console.table(o),console.log(o.getDescription()),console.table(r),console.log(r.length()),r.addItem(i),console.table(r),console.log(r.getItemsList());const n=new t("Make cake33333","1/1/22","Making cakes is awesome","Low",!1),c=new t("Make cake3","1/1/22","Making cakes is awesome","Low",!1),a=new t("Make cake4","1/1/22","Making cakes is awesome","Low",!1),l=new t("Make cake5","1/1/22","Making cakes is awesome","Low",!1),d=new t("Make cake6","1/1/22","Making cakes is awesome","Low",!1);r.addItem(c),r.addItem(a),r.addItem(l),r.addItem(d),r.removeItem(n),console.table(r.getItemsList()),r.removeItem(l),console.table(r.getItemsList()),console.log(r.readItem(a));const m=new s;m.addItem(i),m.addItem(c),m.addItem(a),m.addItem(l),m.addItem(d),m.addItem(n),m.addProject(o),m.addProject(r),console.table(r.getItemsList()),m.removeItem(n),m.removeItem(i),m.createItem("This is a new item","now","foo","high"),m.createItem("This one goes to the empty project","yesterday","bar","low",r.getID()),console.clear(),m.createItem("This is a new item","now","foo","high","m"),console.table(m.getItemsList()),console.table(r.getItemsList()),m.createProject("New And Improved",null,"A good project"),console.table(m.getProjectsList()),m.getItemsList()[1].setTitle("Awesomer"),console.table(m.getItemsList()),console.table(r.getItemsList());const h=JSON.stringify(m);console.log(h),console.table(JSON.parse(h)),console.clear();const g=new s;g.parseFromJSON(h),console.table(g),g.getItemsList()[1].setTitle("this should be changed"),console.table(g.getItemsList()),console.table(g.getProjectsList()[1].getItemsList())})();