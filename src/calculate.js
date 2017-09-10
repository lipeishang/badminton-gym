const {dailyStandard, weekend} = require('./chargingStandard');
const reserveArr = require('./save').reserveArr;
const cancelReserve = require('./save').cancelReserve;
// 预订：[{ reserveUID: 'U005',
//     reserveDate: '2017-08-05',
//     reserveTime: '09:00~18:00',
//     reservePlace: 'A' } ]

// 取消：[ { reserveUID: 'U005',
//   reserveDate: '2017-08-05',
//   reserveTime: '09:00~19:00',
//   reservePlace: 'D' } ]

// dailyStandard: {"9:00~12:00": 30, "12:00~18:00": 50, "18:00~20:00": 80, "20:00~22:00": 60},
// weekend: {"9:00~12:00": 40, "12:00~18:00": 50, "18:00~22:00": 60}
function calculate() {
  var placeA = [], placeB = [], placeC = [], placeD = [];
  var cancelA = [], cancelB = [], cancelC = [], cancelD = [];
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
}

module.exports = calculate;
