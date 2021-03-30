const sieveOfEratosthenes = (n) => {
  var primes = [];

  for (var i = 0; i < n; i++) {
    primes[i] = true;
  }

  primes[0] = false;
  primes[1] = false;

  for (var i = 2; i < Math.sqrt(n); i++) {
    for (var j = 2; i * j < n; j++) {
      primes[i * j] = false;
    }
  }

  return primes.filter((prime) => prime).length;
};

module.exports = sieveOfEratosthenes;
