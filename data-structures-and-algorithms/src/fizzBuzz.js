const fizzBuzz = (num) =>
  num.map((el) =>
    el % 3 === 0
      ? el % 5 === 0
        ? "fizzbuzz"
        : "fizz"
      : el % 5 === 0
      ? "buzz"
      : el
  );

module.exports = fizzBuzz;
