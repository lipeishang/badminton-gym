function printSum(placeA, placeB, placeC, placeD, cancelA, cancelB, cancelC, cancelD) {
  console.log("aaa");
  const totalA = placeA.concat(cancelA);
  const totalB = placeB.concat(cancelB);
  const totalC = placeC.concat(cancelC);
  const totalD = placeD.concat(cancelD);

  console.log(`场地:A`
  );
  placeTotal(totalA, placeA);
  console.log(`场地:B`
  );
  placeTotal(totalB, placeB);  //测试
  console.log(`场地:C`
  );
  placeTotal(totalC, placeC);
  console.log(`场地:D`);
  placeTotal(totalD, placeD);
  console.log(`---`);
  finalTotal(placeA, placeB, placeC, placeD);   //测试
}

function placeTotal(total, place) {


  var arg = total.sort(function (a, b) {

    var date1 = new Date(a.reserveDate + " " + a.reserveTime.slice(0, 2) + ":00");
    var date2 = new Date(b.reserveDate + " " + b.reserveTime.slice(0, 2) + ":00");
    return date1.getTime() - date2.getTime();

  });

  var reserveSum = 0;
  var cancelSum = 0;

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
  });
  var subTotal = reserveSum + cancelSum;

  place.sum = subTotal;
  console.log(`小计:${subTotal}元
`);
  return place;
}

function finalTotal() {
  var finalTotal = 0;

  for (let arg of arguments) {
    finalTotal += arg.sum;
  }
  console.log(`总计:${finalTotal}元`);
}

module.exports = {
  printSum : printSum,
  placeTotal :placeTotal,
  finalTotal:finalTotal
};
