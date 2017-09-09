function confirm(input) {
  const reserveArr = input.trim().split(" ");
  const reserveUID = /^U\d{3}/g;
  const reserveDate = /^(\d{4})-(\d{2})-(\d{2})$/g;
  const reserveTime = /^([0]?[9]|[1][0-9]|[2][0-2]):([0]{2})~([1][0-9]|[2][0-2]):([0]{2})$/;
  const reservePlace = /A|B|C|D/g;
  const startTime = parseInt((reserveArr[2].split("~")[0]).split(":")[0]);
  const endTime = parseInt(reserveArr[2].split("~")[1].split(":")[0]);

  if (!reserveUID.test(reserveArr[0])) {
      console.log("Error:the booking is invalid!");
  }
  else if (!reserveDate.test(reserveArr[1])) {
      console.log("Error:the booking is invalid!");
  }
  else if (!reserveTime.test(reserveArr[2])) {
      console.log("Error:the booking is invalid!");
  }
  else if(startTime>=endTime){
    console.log("Error:the booking is invalid!");
  }

  else if (!reservePlace.test(reserveArr[3])) {
    console.log("Error:the booking is invalid!");
  }
  else if(reserveArr.length == 4){
    console.log("Success: the booking is accepted!");
  }
  else {
    if(!(reserveArr[4] === "C")){
      console.log("Error:the booking is invalid!");
   }
    else {
        console.log("Success: the booking is accepted!");
      }
    }
}

module.exports = confirm;
