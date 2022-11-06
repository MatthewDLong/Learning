/*
Pseudocode

while k > 0
  take the last item from the array
  put it on the front of the array
  decrement k
endwhile
*/

const rotateArray = (nums, k) => {
  while (k > 0) {
    nums.unshift(nums.pop());
    k--;
  }
  return nums;
};

module.exports = rotateArray;
