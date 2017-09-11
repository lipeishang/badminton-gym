function printSum(placeA, placeB, placeC, placeD, cancelA, cancelB, cancelC, cancelD) {
  console.log(`场地:A`
  );
  placeTotal(placeA, cancelA);
  console.log(`场地:B`
  );
  placeTotal(placeB, cancelB);
  console.log(`场地:C`
  );
  placeTotal(placeC, cancelC);
  console.log(`场地:D`);
  placeTotal(placeD, cancelD);
  console.log(`---`);
  finalTotal(placeA, placeB, placeC, placeD);
}

function placeTotal(place) {
  var reserveSum = 0;
  var cancelSum = 0;
  for (let arg of arguments) {
    arg.forEach(function (item) {
      const reserveDate = item.reserveDate;
      const reserveTime = item.reserveTime;
      if (item.reserveItem) {
        reserveSum += item.reserveItem;
        console.log(`${reserveDate} ${reserveTime} ${item.reserveItem}元`);
      } else {
        cancelSum += item.cancelItem;
        console.log(`${reserveDate} ${reserveTime} 违约金 ${item.cancelItem}元`);
      }
    })
  }
  var subTotal = reserveSum + cancelSum;

  place.sum = subTotal;
  console.log(`小计：${subTotal}元
`);
}

function finalTotal() {
  var finalTotal = 0;

  for (let arg of arguments) {
    finalTotal += arg.sum;
  }
  console.log(`总计：${finalTotal}元`);
}

module.exports = printSum;
