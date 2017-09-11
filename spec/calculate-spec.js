/**
 * Created by lipeishang on 17-9-11.
 */
const calculate = require('../src/calculate');
const printSum = require('../src/print-sum');
const _ = require('lodash');

describe('calculate-test', ()=> {
  it('#1| sumItem should be currect when calculate', () => {
    let willSumItem = [{
      reserveUID: "U123",
      reserveDate: "2017-08-18",
      reserveTime: "19:00~20:00",
      reservePlace: "A",

    }, {
      reserveUID: "U123",
      reserveDate: "2017-08-19",
      reserveTime: "19:00~20:00",
      reservePlace: "A",
    }];

    const hasSumItem = [{
      reserveUID: "U123",
      reserveDate: "2017-08-18",
      reserveTime: "19:00~20:00",
      reservePlace: "A",
      reserveItem: 60

    }, {
      reserveUID: "U123",
      reserveDate: "2017-08-19",
      reserveTime: "19:00~20:00",
      reservePlace: "A",
      reserveItem: 60
    }];

    calculate.sumItem(willSumItem);
    expect(_.isEqual(hasSumItem, willSumItem));
  });
  it('#2| sumPlace should be currect when calculate', () => {
    let place = [{
      reserveUID: "U123",
      reserveDate: "2017-08-18",
      reserveTime: "19:00~20:00",
      reservePlace: "A",
      reserveItem: 60
    }, {
      reserveUID: "U123",
      reserveDate: "2017-08-19",
      reserveTime: "19:00~20:00",
      reservePlace: "A",
      reserveItem: 60
    }];

    let total = [{
      reserveUID: "U123",
      reserveDate: "2017-08-18",
      reserveTime: "19:00~20:00",
      reservePlace: "A",
      reserveItem: 60,
    }, {
      reserveUID: "U123",
      reserveDate: "2017-08-19",
      reserveTime: "19:00~20:00",
      reservePlace: "A",
      reserveItem: 60
    }, {
      reserveUID: "U123",
      reserveDate: "2017-08-21",
      reserveTime: "19:00~20:00",
      reservePlace: "A",
      cancelItem: 40

    }, {
      reserveUID: "U123",
      reserveDate: "2017-08-22",
      reserveTime: "19:00~20:00",
      reservePlace: "A",
      cancelItem: 40
    }];

    const placeSum = printSum.placeTotal(total, place);
    expect(placeSum.sum).toEqual(200);
  });
});
