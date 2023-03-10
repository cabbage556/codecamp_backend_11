const format = function (time) {
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
};

export const getToday = function () {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = format(today.getMonth() + 1);
  const dd = format(today.getDate());
  return `${yyyy}-${mm}-${dd}`;
};

// export function getToday(){
//   const aaa = new Date()
//   const yyyy = aaa.getFullYear()
//   const mm = aaa.getMonth() + 1
//   const dd = aaa.getDate()
//   const today = `${yyyy}-${mm}-${dd}`
//   return today
// }
