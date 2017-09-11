const save = require('./save').save;

function confirm(input) {
  const reserveArr = input.trim().split(" ");
  if (reserveArr.length < 4 && reserveArr.length > 5) {
    console.log("Error:the booking is invalid!");
  }
  else {
    const reserveUID = /^U\d{3}/g;
    const reserveDate = /^(\d{4})-(\d{2})-(\d{2})$/g;
    const reserveTime = /^([0]?[9]|[1][0-9]|[2][0-2]):([0]{2})~([1][0-9]|[2][0-2]):([0]{2})$/;
    const reservePlace = /A|B|C|D/g;
    const startTime = parseInt(input.slice(0, 2));
    const endTime = parseInt(input.slice(6, 8));
    var reserveItem = {
      reserveUID: reserveArr[0],
      reserveDate: reserveArr[1],
      reserveTime: reserveArr[2],
      reservePlace: reserveArr[3]
    };
    if (!reserveUID.test(reserveArr[0]) || !reserveDate.test(reserveArr[1]) || !reserveTime.test(reserveArr[2]) || startTime >= endTime || !reservePlace.test(reserveArr[3])) {
      console.log("Error:the booking is invalid!");
    }
    else if (reserveArr.length == 4) {
      if (save.saveReserve(reserveItem)) {
        console.log("Success: the booking is accepted!");
      } else {
        console.log("Error:the booking is invalid!");
      }
    } else {
      if (reserveArr.length == 5 && reserveArr[4] === "C") {
        if (save.saveCancelReserve(reserveItem)) {
          console.log("Success: the booking is accepted!");
        } else {
          console.log("Error:the booking is invalid!");
        }
      } else {
        console.log("Error:the booking is invalid!");
      }
    }
  }
}

module.exports = confirm;
