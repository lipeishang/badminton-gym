const save = require('../src/save');

describe('save-input', ()=> {
  it('#1| should return true when reserveArr.length is 0', () => {
    const reserveArr = [];
    const reserveItem = {
      reserveUID: "U123",
      reserveDate: "2017-08-09",
      reserveTime: "19:00~22:00",
      reservePlace: "A"
    };

    let result = save.saveReserve(reserveItem);
    expect(result).toEqual(true);
  });

  it('#2| should return true when sameDateItem.length is 0', () => {
    const hasReserve = {
      reserveUID: "U123",
      reserveDate: "2017-08-11",
      reserveTime: "19:00~22:00",
      reservePlace: "A"
    };

    let saveBefore = save.saveReserve(hasReserve);

    const reserveItem = {
      reserveUID: "U123",
      reserveDate: "2017-08-13",
      reserveTime: "19:00~22:00",
      reservePlace: "A"
    };

    let result = save.saveReserve(reserveItem);
    expect(result).toEqual(true);
  });

  it('#3| should return true when reserveTime has no cross', () => {
    const reserve = [{
      reserveUID: "U123",
      reserveDate: "2017-08-14",
      reserveTime: "19:00~22:00",
      reservePlace: "A"
    }, {
      reserveUID: "U123",
      reserveDate: "2017-08-10",
      reserveTime: "13:00~15:00",
      reservePlace: "A"
    }];

    let result = save.saveReserve(reserve);
    expect(result).toEqual(true);
  });

  it('#4| should return false when reserveTime has cross ', () => {
    const willReserve = {
      reserveUID: "U123",
      reserveDate: "2017-08-15",
      reserveTime: "19:00~22:00",
      reservePlace: "A"
    };

    const hasReserve = {
      reserveUID: "U123",
      reserveDate: "2017-08-15",
      reserveTime: "19:00~20:00",
      reservePlace: "A"
    };

    let saveBefore = save.saveReserve(hasReserve);
    let result = save.saveReserve(willReserve);
    expect(result).toEqual(false);
  });

  it('#5| should return false when cancelItem is not exit', ()=> {
    const willCancelItem = {
      reserveUID: "U123",
      reserveDate: "2017-08-16",
      reserveTime: "19:00~20:00",
      reservePlace: "A"
    };
    let result = save.saveCancelReserve(willCancelItem);
    expect(result).toEqual(false);
  });

  it('#6| should return true when cancelItem is currect', ()=> {

    const willCancelItem = {
      reserveUID: "U123",
      reserveDate: "2017-08-17",
      reserveTime: "19:00~20:00",
      reservePlace: "A"
    };

    save.saveReserve(willCancelItem);

    let result = save.saveCancelReserve({
      reserveUID: "U123",
      reserveDate: "2017-08-17",
      reserveTime: "19:00~20:00",
      reservePlace: "A"
    });
    expect(result).toEqual(true);
  })
});
