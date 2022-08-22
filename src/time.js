import format from 'date-fns/format'

export default function test(){
  // const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy');
  // console.log(result);
  getToday();
}

export function getToday(){
  const currentDate = new Date();
  const today = format(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), "yyyy-MM-dd");
  return today;
}