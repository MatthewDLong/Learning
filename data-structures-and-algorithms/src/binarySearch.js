/*
Pseudocode

recursive binarySearch function (nums array, target integer)
  var left = 0
  var right = nums length - 1
  var middle index
  var middle element

  while target greater than or equal left and less than or equal to right

    middle index = rounded down ( nums / 2 )
    middle element = nums[middle index]

    if target equal to middle element
      // base case
      return true
    else if target less than middle element
      binarySearch( first half of nums, target )
    else if target greater than middle element
      binarySearch ( second half of nums, target )
    endif
  endwhile

  return false
endfunction
*/

const binarySearchRecursive = (nums, target) => {
  var left = 0;
  var right = nums.length - 1;
  var middleIndex;

  while (left <= right) {
    middleIndex = left + Math.floor((right - left) / 2);

    // base case
    if (target === nums[middleIndex]) {
      return true;
    } else if (target < nums[middleIndex]) {
      return binarySearchRecursive(nums.splice(0, middleIndex), target);
    } else if (target > nums[middleIndex]) {
      return binarySearchRecursive(
        nums.splice(middleIndex + 1, nums.length),
        target
      );
    }
  }

  return false;
};

module.exports = binarySearchRecursive;
