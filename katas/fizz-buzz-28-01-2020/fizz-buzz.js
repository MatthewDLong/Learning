for (let i = 0; i < 100; i++) {
  let symbol;
  if (i + (1 % 3) === 0) {
    symbol = "fizz";
  } else if (i + (1 % 5) === 0) {
    symbol = "buzz";
  } else {
    symbol = i + 1;
  }
  console.log(symbol);
}
