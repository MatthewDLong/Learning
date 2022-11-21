const assert = require("assert").strict;

const runAssertion = (assertion) => {
  try {
    assertion();
  } catch (err) {
    console.error(err.message);
  }
};

const reverseArray = (a) => {
  let reversed = [];
  while (a.length > 0) {
    reversed.push(a.pop());
  }
  return reversed;
};

runAssertion(() => {
  assert.deepEqual(reverseArray([1, 2, 3]), [3, 2, 1]);
});

const sumArray = (a) => a.reduce((prev, current) => prev + current, 0);

runAssertion(() => {
  assert.deepEqual(sumArray([1, 2, 3]), 6);
});

const binarySearchIterative = (sortedArray, target) => {
  let left = 0;
  let right = sortedArray.length - 1;
  let middleIndex;
  while (left <= right) {
    middleIndex = Math.floor((left + right) / 2);
    if (sortedArray[middleIndex] === target) {
      return middleIndex;
    } else if (sortedArray[middleIndex] < target) {
      left = middleIndex + 1;
    } else {
      right = middleIndex - 1;
    }
  }
};

runAssertion(() => {
  assert.deepEqual(
    binarySearchIterative([0, 2, 4, 6, 8, 9, 12, 14, 20, 34, 86], 20),
    8
  );
});

const binarySearchIterativeA = (sortedArray, target) => {
  let left = 0;
  let right = sortedArray.length - 1;
  let middleIndex;
  while (left <= right) {
    middleIndex = Math.floor((left + right) / 2);

    if (sortedArray[middleIndex] === target) {
      return right;
    } else if (target < sortedArray[middleIndex]) {
      right = middleIndex - 1;
    } else {
      left = middleIndex + 1;
    }
  }
};

runAssertion(() => {
  assert.deepEqual(
    binarySearchIterativeA(
      [2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 15, 16, 17, 18, 19, 20],
      7
    ),
    4
  );
});

const binarySearchIterativeB = (a, target) => {
  let left = 0;
  let right = a.length - 1;
  let middle;
  while (left <= right) {
    middle = Math.floor((left + right) / 2);
    if (a[middle] === target) {
      return middle;
    } else if (target < a[middle]) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }
};

runAssertion(() => {
  assert.deepEqual(
    binarySearchIterativeB([2, 3, 5, 6, 8, 12, 23, 45, 78, 90], 45),
    7
  );
});

const binarySearchIterativeC = (a, target) => {
  let left = 0;
  let right = a.length - 1;
  let middle;
  while (left <= right) {
    middle = Math.floor((left + right) / 2);
    if (target === a[middle]) {
      return middle;
    } else if (target < a[middle]) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }
};

runAssertion(() => {
  assert.deepEqual(binarySearchIterativeC([10, 23, 45, 67, 89], 67), 3);
});

const binarySearchRecursive = (a, target) => {
  let left = 0;
  let right = a.length - 1;
  let middle;
  while (left <= right) {
    middle = Math.floor((left + right) / 2);
    if (a[middle] === target) {
      return target;
    } else if (target < a[middle]) {
      return binarySearchRecursive(a.slice(0, middle), target);
    } else {
      return binarySearchRecursive(a.slice(middle + 1), target);
    }
  }
};

runAssertion(() => {
  assert.deepEqual(
    binarySearchRecursive([12, 34, 56, 78, 99, 102, 105, 234], 78),
    78
  );
});

runAssertion(() => {
  assert.deepEqual(
    binarySearchRecursive(
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      9
    ),
    9
  );
});

runAssertion(() => {
  assert.deepEqual(binarySearchRecursive([10, 10, 10], 10), 10);
});

const binarySearchRecursiveA = (a, target) => {
  let left = 0;
  let right = a.length - 1;

  while (left <= right) {
    let middle = Math.floor((left + right) / 2);
    if (a[middle] === target) {
      return a[middle];
    } else if (a[middle] < target) {
      return binarySearchRecursiveA(a.slice(middle + 1), target);
    } else {
      return binarySearchRecursiveA(a.slice(0, middle), target);
    }
  }
};

runAssertion(() => {
  assert.equal(
    binarySearchRecursiveA(
      [1, 2, 4, 6, 7, 9, 10, 12, 14, 16, 18, 20, 23, 25, 27, 28],
      9
    ),
    9
  );
});

/*
Fibonacci sequence

First 14 integers of Fibonacci Sequence

0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233

Input: n = 0
Output: 0
Explanation: F(0) = F(0) + F(0) = 0 + 0 = 0.

Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.

Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.

Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.

*/

const fib = (n, lookup) => {
  lookup = lookup || new Map();
  if (n === 0) {
    return 0;
  } else if (n < 3) {
    return 1;
  }
  if (lookup.has(n)) {
    return lookup.get(n);
  } else {
    const result = fib(n - 1, lookup) + fib(n - 2, lookup);
    lookup.set(n, result);
    return result;
  }
};

runAssertion(() => {
  assert.equal(fib((n = 0)), 0);
  assert.equal(fib((n = 1)), 1);
  assert.equal(fib((n = 2)), 1);
  assert.equal(fib((n = 3)), 2);
  assert.equal(fib((n = 13)), 233);
});

const longestCommonSubsequence = function (s1, s2) {
  var table = new Array(s1.length + 1)
    .fill(0)
    .map(() => new Array(s2.length + 1).fill(0));

  for (var i = 1; i < table.length; i++) {
    for (var j = 1; j < table[i].length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        table[i][j] = table[i - 1][j - 1] + 1;
      } else {
        table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
      }
    }
  }
  return table[s1.length][s2.length];
};

runAssertion(() => {
  assert.equal(longestCommonSubsequence("abcde", "ace"), 3);
});
