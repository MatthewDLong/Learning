/*
function reverseWord (input (string))
  var reversed words (string)
  var words array = split input on space character i.e. ' '

  for word in words array
    var reversedWord = reverse word
    append the reversed word onto the reversed words string

    if this is not the last word
      append a space character to the reversed word i.e. ' '
    endif
  endfor
endfunction
*/

const reverseWords = (input) => {
  var reversedWords = "";
  var wordsArray = input.split(" ");

  for (var i = 0; i < wordsArray.length; i++) {
    let currentWord = wordsArray[i];
    let currentWordArray = currentWord.split("");
    let currentWordArrayReversed = currentWordArray.reduce((a, c) => {
      a.unshift(c);
      return a;
    }, []);
    let reversedCurrentWord = currentWordArrayReversed.join("");
    reversedWords += reversedCurrentWord;

    if (i === wordsArray.length - 1) {
      continue;
    } else {
      reversedWords += " ";
    }
  }

  return reversedWords;
};

module.exports = reverseWords;
