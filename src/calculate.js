const standard = require('./chargingStandard');
const reserveArr = require('./save').reserveArr;
const cancelReserve = require('./save').cancelReserve;
const printSum = require('./print-sum');

function calculate() {
  var placeA = [], placeB = [], placeC = [], placeD = [];
  var cancelA = [], cancelB = [], cancelC = [], cancelD = [];
  const flag = 1;
  reserveArr.forEach(function (item) {
    switch (item.reservePlace) {
      case "A":
        placeA.push(item);
        break;
      case "B":
        placeB.push(item);
        break;
      case "C":
        placeC.push(item);
        break;
      case "D":
        placeD.push(item);
    }
  });
  cancelReserve.forEach(function (item) {
    switch (item.reservePlace) {
      case "A":
        cancelA.push(item);
        break;
      case "B":
        cancelB.push(item);
        break;
      case "C":
        cancelC.push(item);
        break;
      case "D":
        cancelD.push(item);
    }
  });
  console.log(`收入汇总
---`);
  [placeA, placeB, placeC, placeD].forEach(function (placeItem) {
    if (placeItem.length == 0) {
      placeItem.reserveItem = 0;
    } else {
      sumItem(placeItem);
    }
  });
  [cancelA, cancelB, cancelC, cancelD].forEach(function (cancelItem) {
    if (cancelItem.length == 0) {
      cancelItem.cancelItem = 0;
    } else {
      sumItem(cancelItem, flag);
    }
  });
  printSum.printSum(placeA, placeB, placeC, placeD, cancelA, cancelB, cancelC, cancelD);
}

function sumItem(arr, flag) {
  for (let i = 0; i < arr.length; i++) {
    const reserveStart = parseInt(arr[i].reserveTime.slice(0, 2));
    const reserveEnd = parseInt(arr[i].reserveTime.slice(6, 8));
    var week = new Date(arr[i].reserveDate).getDay();
    switch (week) {
      case 0:
      case 6:
        flag === undefined ? arr[i].reserveItem = getSumItem(standard.weekendStandard, reserveStart, reserveEnd) :
          arr[i].cancelItem = getSumItem(standard.weekendStandard, reserveStart, reserveEnd) * 0.25;
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        flag === undefined ? arr[i].reserveItem = getSumItem(standard.dailyStandard, reserveStart, reserveEnd) :
          arr[i].cancelItem = getSumItem(standard.dailyStandard, reserveStart, reserveEnd) * 0.5;
        break;
    }
  }
}

function getSumItem(standard, reserveStart, reserveEnd) {
  for (let i = 0; i < standard.length; i++) {
    let start = standard[i].startTime;
    let end = standard[i].endTime;
    if (reserveStart >= start && reserveStart < end && reserveEnd <= end) {
      return (reserveEnd - reserveStart) * standard[i].money;
    }
    if (reserveStart >= start && reserveStart < end && reserveEnd > end) {
      return (end - reserveStart) * standard[i].money + getSumItem(standard, end, reserveEnd);
    }
  }
}

module.exports = {
  calculate: calculate,
  sumItem: sumItem,
  getSumItem: getSumItem
};
