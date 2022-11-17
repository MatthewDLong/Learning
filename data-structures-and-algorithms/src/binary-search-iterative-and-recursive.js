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
