/**
 * Created by lipeishang on 17-9-11.
 */
const calculate = require('../src/calculate');

describe('print-test', ()=> {
  it('#1| should print income when calculate', () => {

    const print =`
收入汇总
---
场地:A
2017-08-01 10:00~22:00 违约金 320元
小计:320元

场地:B
小计:0元

场地:C
小计:0元

场地:D
小计:0元

---
总计:320元`;
    spyOn(console,'log');
    calculate.calculate();
    expect(console.log).toHaveBeenCalledWith(print);
  });
});
