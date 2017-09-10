var reserveArr = [];
var cancelReserve = [];
const save = {
  saveReserve: function (reserveItem) {
    if (reserveArr.length == 0) {
      reserveArr.push(reserveItem);
      return true;
    }

    else {
      const sameDateItem = reserveArr.filter(function (item) {
        return item.reserveDate == reserveItem.reserveDate;
      });

      if (sameDateItem.length == 0) {
        reserveArr.push(reserveItem);
        return true;
      }
      else {
        const isSave = sameDateItem.every(function (item) {
          const itemStart = parseInt((item.reserveTime.split("~")[0]).split(":")[0]);
          const itemEnd = parseInt((item.reserveTime.split("~")[1]).split(":")[0]);
          const reserveStart = parseInt((reserveItem.reserveTime.split("~")[0]).split(":")[0]);
          const reserveEnd = parseInt((reserveItem.reserveTime.split("~")[0]).split(":")[0]);

          return itemEnd < reserveStart || reserveEnd < itemStart;
        });

        if (isSave) {
          reserveArr.push(reserveItem);
          return true;
        }
        else {
          return false;
        }
      }
    }
  },
  saveCancelReserve: function (reserveItem) {
    const isExist = JSON.stringify(reserveArr).indexOf(JSON.stringify(reserveItem))!=-1;

    if (isExist){
      cancelReserve.push(reserveArr.shift());
      return true;
    }
    else {
      return false;
    }
  }
};
module.exports = save;
