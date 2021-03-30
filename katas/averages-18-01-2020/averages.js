const mean = numbers =>
  numbers.reduce((accumulator, item) => accumulator + item, 0) / numbers.length;

const mode = (numbers) => {
  let store = {};
  let max = 0;
  let mode = [];

  numbers.map((number) => {
    if(!store[number]) {
      store[number] = 0;
    }
    store[number]++;

    if(store[number] == max) {
      mode.push(store[number]);
    } else if (store[number] > max) {
      max = store[number];
      mode = [number];
    }
  })

  return mode;
}

const median = numbers => {
    numbers.sort();
    var middle = Math.floor(numbers.length / 2);
    if(numbers.length % 2 == 1) {
        return numbers[middle];
    } else {
        return numbers[middle] + numbers[middle - 1] / 2;
    }
}

module.exports = { mean, mode, median };
