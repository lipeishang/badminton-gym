'use strict';

const confirm = require('../src/confirm');

describe('input-test', ()=> {
  it('#1| should return false when input is a string without space', () => {
    const input = 'abcdefghijklmnopqrst1234567890';
    let result = confirm(input);
    expect(result).toEqual(false);
  });

  it('#2| should return false when input startTime == endTime', () => {
    const input = 'U001 2016-06-02 22:00~22:00 A';
    let result = confirm(input);
    expect(result).toEqual(false);
  });

  it('#3| should return false when userID is illegal', ()=> {
    const input = '2 2017-08-01 19:00~22:00 A';
    let result = confirm(input);
    expect(result).toEqual(false);
  });

  it('#4| should return false when reserveDate is illegal', ()=> {
    const input = 'U002 2017/08/01 19:00~22:00 A';
    let result = confirm(input);
    expect(result).toEqual(false);
  });

  it('#5| should return false when reserveTime is illegal', ()=> {
    const input = 'U002 2017-08-01 08:00~22:00 A';
    let result = confirm(input);
    expect(result).toEqual(false);
  });

  it('#6| should return false when reservePlace is illegal', ()=> {
    const input = 'U002 2017-08-01 10:00~22:00 E';
    let result = confirm(input);
    expect(result).toEqual(false);
  });

  it('#7| should return false when cancelReserve is not C', ()=> {
    const input = 'U002 2017-08-01 10:00~22:00 A D';
    let result = confirm(input);
    expect(result).toEqual(false);
  });

  it('#8| should return true when reserve is legal', ()=> {
    const input = 'U002 2017-08-01 10:00~22:00 A';
    let result = confirm(input);
    expect(result).toEqual(true);
  });

  it('#9| should return true when cancelReserve is legal', ()=> {
    const input = 'U002 2017-08-01 10:00~22:00 A C';
    let result = confirm(input);
    expect(result).toEqual(true);
  });
});



