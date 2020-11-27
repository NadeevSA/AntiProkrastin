function isHourRange(from, to) {
   var now = new Date();
   var curHour = now.getHours();
   return curHour >= from && curHour <= to;
}