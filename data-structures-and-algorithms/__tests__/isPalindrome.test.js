const isPalindrome = require("../src/isPalindrome");

describe("isPalindrome", () => {
  it("should return true when given a valid palindrome", () => {
    expect(isPalindrome("A man, a plan, a canal: Panama")).toEqual(true);
  });

  it("should return false when given a word that is not a palindrome", () => {
    expect(isPalindrome("race a car")).toEqual(false);
  });
});
