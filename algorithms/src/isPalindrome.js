/*
Pseudocode

function isPalindrome (s (string))
  
  // create some variables
  var lower
  var reverse = empty string
  var alpha numeric character Map = { a-z, 0-9 }

  // remove non alphanumeric characters
  for char in s
    if alpha numeric map has char
      append char to lower
  endfor

  // reverse the string
  for i from end of lower until i greater than or equal to 0
    append lower[i] to reverse
  endfor

  // compare the string, return the result
  if lower equal to reverse
    return true
  else
    return false
endfunction
*/

const isPalindrome = (s) => {
  var lower = "";
  var reverse = "";

  var alphaNumeric = new Map();
  alphaNumeric.set("a", "a");
  alphaNumeric.set("b", "b");
  alphaNumeric.set("c", "c");
  alphaNumeric.set("d", "d");
  alphaNumeric.set("e", "e");
  alphaNumeric.set("f", "f");
  alphaNumeric.set("g", "g");
  alphaNumeric.set("h", "h");
  alphaNumeric.set("i", "i");
  alphaNumeric.set("j", "j");
  alphaNumeric.set("k", "k");
  alphaNumeric.set("l", "l");
  alphaNumeric.set("m", "m");
  alphaNumeric.set("n", "n");
  alphaNumeric.set("o", "o");
  alphaNumeric.set("p", "p");
  alphaNumeric.set("q", "q");
  alphaNumeric.set("r", "r");
  alphaNumeric.set("s", "s");
  alphaNumeric.set("t", "t");
  alphaNumeric.set("u", "u");
  alphaNumeric.set("v", "v");
  alphaNumeric.set("w", "w");
  alphaNumeric.set("x", "x");
  alphaNumeric.set("y", "z");
  alphaNumeric.set("z", "z");

  alphaNumeric.set("0", "0");
  alphaNumeric.set("1", "1");
  alphaNumeric.set("2", "2");
  alphaNumeric.set("3", "3");
  alphaNumeric.set("4", "4");
  alphaNumeric.set("5", "5");
  alphaNumeric.set("6", "6");
  alphaNumeric.set("7", "7");
  alphaNumeric.set("8", "8");
  alphaNumeric.set("9", "9");

  for (const char of s) {
    var lowerCaseChar = char.toLowerCase();
    if (alphaNumeric.has(lowerCaseChar)) {
      lower += lowerCaseChar;
    }
  }

  for (var i = lower.length - 1; i >= 0; i--) {
    reverse += lower[i];
  }

  return lower === reverse;
};

module.exports = isPalindrome;
