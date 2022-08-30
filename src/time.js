import format from 'date-fns/format';
import compareDesc from 'date-fns/compareDesc';
import parseISO from 'date-fns/parseISO';

export function getToday() {
  const currentDate = new Date();
  const today = format(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()), 'yyyy-MM-dd');
  return today;
}

export function getOneWeek() {
  const currentDate = new Date();
  const nextWeek = format(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 6), 'yyyy-MM-dd');
  return nextWeek;
}

export function filterWithinWeek(items) {
  const result = items.filter((item) => {
    if (item.getDueDate() === 'Never') {
      return false;
    } if (compareDesc(parseISO(item.getDueDate()), parseISO(getOneWeek())) === -1
        || item.isDone()) {
      return false;
    }
    return true;
  });
  return result;
}

export function compare(a, b) {
  if (a.getDueDate() === 'Never') {
    return -1;
  }
  if (b.getDueDate() === 'Never') {
    return 1;
  }

  return compareDesc(parseISO(a.getDueDate()), parseISO(b.getDueDate()));
}

export function isExpired(a) {
  if (a.getDueDate() === 'Never') {
    return false;
  }

  if (compareDesc(parseISO(a.getDueDate()), parseISO(getToday())) === -1
    || compareDesc(parseISO(a.getDueDate()), parseISO(getToday())) === 0) {
    return false;
  }
  return true;
}

export function expiresToday(a) {
  if (a.getDueDate() === 'Never') {
    return false;
  }

  if (compareDesc(parseISO(a.getDueDate()), parseISO(getToday())) === 0) {
    return true;
  }
  return false;
}

export function expiresInAWeek(a) {
  if (a.getDueDate() === 'Never') {
    return false;
  }

  if (compareDesc(parseISO(a.getDueDate()), parseISO(getOneWeek())) === -1
    || compareDesc(parseISO(a.getDueDate()), parseISO(getOneWeek())) === 0) {
    return false;
  }
  return true;
}
