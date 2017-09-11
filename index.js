const readline = require('readline');
const confirm = require('./src/confirm');
const calculate = require('./src/calculate');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input)=> {
  if (input != "") {
    confirm(input);
  }
  else {
    calculate();
    rl.close();
  }
});




