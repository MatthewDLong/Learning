/*
O(n)

function reverseWord (input (string))
  var words array
  var reversed array
  var reversed string

  words array = split the input

  for word of words array
    trim the word
    shift the word onto the begginning of reversed array
  endfor

  reversed string = join reversed array with a single space

  return reversed string
endfunction

*/

const reverseWord = (s) => {
  var wordsArray;
  var reversedArray = [];
  var reversedString;

  wordsArray = s.split(" ");

  wordsArray
    .filter((word) => word.length > 0)
    .forEach((word) => {
      reversedArray.unshift(word.trim());
    });

  reversedString = reversedArray.join(" ");

  return reversedString;
};

module.exports = reverseWord;
