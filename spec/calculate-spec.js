/**
 * Created by lipeishang on 17-9-11.
 */
const calculate = require('../src/calculate');

describe('calculate-spec', ()=> {
  it('#1| sum should be currect when calculate', () => {
    let willSumItem = {
      reserveUID: "U123",
      reserveDate: "2017-08-18",
      reserveTime: "19:00~20:00",
      reservePlace: "A"
    };

    const hasSumItem = {
      reserveUID: "U123",
      reserveDate: "2017-08-18",
      reserveTime: "19:00~20:00",
      reservePlace: "A",
      reserveItem: 60
    };

    calculate.sumItem(willSumItem);
    expect(willSumItem).toEqual(hasSumItem);
  });
});
