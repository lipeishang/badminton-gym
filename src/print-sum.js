function printSum(placeA, placeB, placeC, placeD, cancelA, cancelB, cancelC, cancelD) {
  const totalA = placeA.concat(cancelA);
  const totalB = placeB.concat(cancelB);
  const totalC = placeC.concat(cancelC);
  const totalD = placeD.concat(cancelD);

  const placeATotal = placeTotal(totalA, placeA);
  const placeBTotal = placeTotal(totalB, placeB);  //测试
  const placeCTotal = placeTotal(totalC, placeC);
  const placeDTotal = placeTotal(totalD, placeD);

  const finalTotal = subTotal(placeATotal, placeBTotal, placeCTotal, placeDTotal);

  var printA = printItem(placeATotal.arg);

  if (!printA) {
    printA = `小计:${placeATotal.subTotal}元`
  }
  else {
    printA = printA + "\n" + `小计:${placeATotal.subTotal}元`
  }

  var printB = printItem(placeBTotal.arg);
  if (!printB) {
    printB = `小计:${placeBTotal.subTotal}元`
  }
  else {
    printB = printB + "\n" + `小计:${placeBTotal.subTotal}元`
  }

  var printC = printItem(placeCTotal.arg);
  if (!printC) {
    printC = `小计:${placeCTotal.subTotal}元`
  }
  else {
    printC = printC + "\n" + `小计:${placeCTotal.subTotal}元`
  }

  var printD = printItem(placeDTotal.arg);
  if (!printD) {
    printD = `小计:${placeDTotal.subTotal}元`
  }
  else {
    printD = printD + "\n" + `小计:${placeDTotal.subTotal}元`
  }

  const print = `
收入汇总
---
场地:A
${printA}

场地:B
${printB}

场地:C
${printC}

场地:D
${printD}

---
总计:${finalTotal}元`;

  console.log(print);
}
function printItem(arr) {
  var str = '';
  if (arr.length === 0) {
    return '';
  }
  else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].reserveItem) {
        i === arr.length - 1 ? str += `${arr[i].reserveDate} ${arr[i].reserveTime} ${arr[i].reserveItem}元` :
          str += `${arr[i].reserveDate} ${arr[i].reserveTime} ${arr[i].reserveItem}元
`;
      } else {
        i === arr.length - 1 ? str += `${arr[i].reserveDate} ${arr[i].reserveTime} 违约金 ${arr[i].cancelItem}元` :
          str += `${arr[i].reserveDate} ${arr[i].reserveTime} ${arr[i].cancelItem}元
`;
      }
    }
    return str;
  }
}

function placeTotal(total) {
  var arg = total.sort(function (a, b) {
    var date1 = new Date(a.reserveDate + " " + a.reserveTime.slice(0, 2) + ":00");
    var date2 = new Date(b.reserveDate + " " + b.reserveTime.slice(0, 2) + ":00");
    return date1.getTime() - date2.getTime();
  });
  var reserveSum = 0;
  var cancelSum = 0;
  var countTotal;

  arg.forEach(function (item) {
    if (item.reserveItem) {
      reserveSum += item.reserveItem;
    } else {
      cancelSum += item.cancelItem;
    }
  });

  countTotal = reserveSum + cancelSum;

  if (countTotal === undefined) {
    countTotal = 0;
  }

  return {subTotal: countTotal, arg: arg};
}

function subTotal(placeATotal, placeBTotal, placeCTotal, placeDTotal) {
  var finalTotal;

  finalTotal = placeATotal.subTotal + placeBTotal.subTotal + placeCTotal.subTotal + placeDTotal.subTotal;

  return finalTotal;
}

module.exports = {
  printSum: printSum,
  placeTotal: placeTotal,
  finalTotal: subTotal
};
