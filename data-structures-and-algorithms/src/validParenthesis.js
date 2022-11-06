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
  const charMap = new Map();
  charMap.set(")", "(");
  charMap.set("]", "[");
  charMap.set("}", "{");

  let stack = [];

  let lastOpeningParenthesis = stack.length === 0 ? "#" : stack.pop();

  for (let char in s) {
    if (charMap.has(char)) {
      if (lastOpeningParenthesis !== charMap.get(char)) {
        return false;
      }
    }
  }

  return stack.length === 0;
};

module.exports = isValidParenthesis;
