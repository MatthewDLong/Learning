function generateParenthesis(n) {
  var combinations = generateAll(n);
  return combinations;
}

function generateAll(n) {
  let result = [];

  function generate(currentString, openBrackets, closedBrackets, n) {
    // If the current string is full
    if (currentString.length == n * 2) {
      if (isValid(currentString)) {
        // Add to combinations array
        return result.push(currentString);
      } else {
        return;
      }
    }

    // If more brackets can be opened
    if (openBrackets < n) {
      console.log(24);
      // Call the function again, with one additional bracket opened
      generate(currentString + "(", openBrackets + 1, closedBrackets, n);
    }

    // If open brackets still need to be closed
    if (closedBrackets < openBrackets) {
      console.log(32);
      // Call the function again, with one additional bracket closed
      generate(currentString + ")", openBrackets, closedBrackets + 1, n);
    }
  }

  // Generate all combinations
  generate("", 0, 0, n);
  return result;
}

function isValid(s) {
  let balance = 0;
  for (const c of s) {
    if (c === "(") {
      balance++;
    } else {
      balance--;
    }
    if (balance < 0) {
      return false;
    }
  }
  return balance == 0;
}
