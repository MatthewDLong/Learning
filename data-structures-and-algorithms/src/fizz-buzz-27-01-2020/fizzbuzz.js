const fizzbuzz = input => {
  const result = input.map(number => {
    if (number % 3 === 0) {
      return "Fizz";
    } else if (number % 5 === 0) {
      return "Buzz";
    } else {
      return number;
    }
  });
  return result;
};

module.exports = fizzbuzz;
