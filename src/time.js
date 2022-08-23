import format from "date-fns/format";
import compareDesc from "date-fns/compareDesc";
import parseISO from "date-fns/parseISO";

export function test(){
  getOneWeek();
}

export function getToday(){
  const currentDate = new Date();
  const today = format(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), "yyyy-MM-dd");
  return today;
}

export function getOneWeek(){
  const currentDate = new Date();
  const nextWeek = format(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 6), "yyyy-MM-dd");
  return nextWeek;
}

export function filterWithinWeek(items){
  const result = items.filter(item => {
    if(item.getDueDate() === "Never"){
      return false;
    }
    else if(compareDesc(parseISO(item.getDueDate()), parseISO(getOneWeek())) === -1){
      return false;
    }
    else{
      return true;
    }
  });
  return result;
}