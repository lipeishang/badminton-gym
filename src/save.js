var reserveArr = [];
var cancelReserve = [];
const _ = require('lodash');

const save = {
  saveReserve: function (reserveItem) {
    if (reserveArr.length == 0) {
      reserveArr.push(reserveItem);
      return true;
    } else {
      const sameDateItem = reserveArr.filter(function (item) {
        return item.reserveDate == reserveItem.reserveDate && item.reservePlace === reserveItem.reservePlace;
      });

      if (sameDateItem.length == 0) {
        reserveArr.push(reserveItem);
        return true;
      } else {
        const isSave = sameDateItem.every(function (item) {
          const itemStart = parseInt((item.reserveTime.split("~")[0]).split(":")[0]);
          const itemEnd = parseInt((item.reserveTime.split("~")[1]).split(":")[0]);
          const reserveStart = parseInt((reserveItem.reserveTime.split("~")[0]).split(":")[0]);
          const reserveEnd = parseInt((reserveItem.reserveTime.split("~")[0]).split(":")[0]);
          return itemEnd < reserveStart && reserveEnd < itemStart;
        });

        if (isSave) {
          reserveArr.push(reserveItem);
          return true;
        } else {
          return false;
        }
      }
    }
  },
  saveCancelReserve: function (reserveItem) {
    for (let i = 0; i < reserveArr.length; i++) {
      if (_.isEqual(reserveArr[i], reserveItem)) {
        reserveArr.splice(i, 1);
        cancelReserve.push(reserveItem);
        return true;
      }
    }
    return false;
  }
};
module.exports = {
  save: save,
  reserveArr: reserveArr,
  cancelReserve: cancelReserve
};
