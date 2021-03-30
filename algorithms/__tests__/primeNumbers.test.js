const sieveOfEratosthenes = require("../src/primeNumbers");

describe("sieveOfEratosthenes", () => {
  it("should return the number of primes up to n", () => {
    expect(sieveOfEratosthenes(20)).toEqual(8);
  });

  it("should return 0 when given 0", () => {
    expect(sieveOfEratosthenes(0)).toEqual(0);
  });

  it("should return 0 when given 1", () => {
    expect(sieveOfEratosthenes(1)).toEqual(0);
  });
});
