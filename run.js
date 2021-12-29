const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let counter = 0;
let queue = [];
let L, C, N = 0;

rl.on('line', (line) => {
  if (counter === 0) {
    [L, C, N] = line.trim().split(' ').map(Number);
    counter++;
    // Check that L, C and N are integers
    if (isNaN(L) || isNaN(C) || isNaN(N)) {
      console.log('L, C and N must be integers');
      process.exit();
    }
  } else {
    // Check that the curren line is lower or equal to L
    if (Number(line.trim()) > L) {
      console.log('The number of people in a group must be lower or equal to L');
      process.exit();
    } else {
      // Check if we should keep listening for new line
      if (counter <= N) {
        queue.push(parseInt(line));
        counter++;
      }
      // If not, we can close the readline interface
      if (counter - 1 === N) {
        // console.log(groups)
        rl.close();
      }
    }
  }
});

rl.on('close', () => {
  // When the readline interface is closed, we can solve the problem
  // console.log(queue);
  solve(L, C, N, queue);
});

const solve = (L, C, N, queue) => {
  console.log(`L: ${L}, C: ${C}, N: ${N}`);
}