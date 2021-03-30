/*
Pseudocode

Linear time complexity: O(n)

function validParenthesis (s (string))
  var m (map) = {
    ) = (
    ] = [
    } = {
  }

  var s (stack)
  var lastOpeningParenthesis (string)

  for char in string

    if m contains char
      if stack is empty
        lastOpeningParenthesis = #
      else
        lastOpeningParenthesis = pop top char from stack
        if lastOpeningParenthesis not equal to m.get char
          return false

    if stack is empty
      return true

    else
      return false

  endfor
endfunction

*/

const isValidParenthesis = (s) => {
  var charMap = new Map();
  charMap.set(")", "(");
  charMap.set("]", "[");
  charMap.set("}", "{");

  var stack = [];

  var lastOpeningParenthesis;

  for (const char of s) {
    if (charMap.has(char)) {
      lastOpeningParenthesis = stack.length === 0 ? "#" : stack.pop();

      if (lastOpeningParenthesis !== charMap.get(char)) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
};

module.exports = isValidParenthesis;
