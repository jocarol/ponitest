const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

let counter = 0;
let groups = [];
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
        groups.push(parseInt(line));
        counter++;
      }
      // If not, we can close the readline interface
      if (counter - 1 === N) {
        rl.close();
      }
    }
  }
});

rl.on('close', () => {
  // When the readline interface is closed, we can solve the problem
  solve(L, C, N, groups);
});

const solve = (L, C, N) => {
  let sum = 0;
  // We are using 'queueIndex' to keep track of the index of the group
  // we are currently working on
  let queueIndex = 0;
  let riders = 0;

  console.time('for')
    // We iterate over the number of rides
  for (let i = 0; i < C; i++) {
    let seats = 0;

    // We iterate over the number of groups.
    for (let j = 0; j < N && seats + groups[queueIndex] <= L; j++) {
      seats += groups[queueIndex];
      queueIndex++;
      // When we reach the end of the queue, we start from the beginning by
      // reseting 'queueIndex' to 0
      if (queueIndex >= N) queueIndex = 0;
    }
    riders += seats;
  }
  console.log(riders);
}