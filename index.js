const readline = require('readline');
const confirm = require('./src/confirm');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line',(input)=>{
    confirm(input);
    if(input == ''){

    rl.close();
  }
});




