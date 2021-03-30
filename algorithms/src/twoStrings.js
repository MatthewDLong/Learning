const twoStrings = (s1, s2) => {
  let match = false;
  const s1a = s1.trim().split("");
  const s2a = s2.trim().split("");
  s1a.forEach((a) => {
    s2a.forEach((b) => {
      if (match) {
        return match;
      } else if (a === b) {
        match = true;
      }
    });
  });
  return match ? "YES" : "NO";
};

module.exports = twoStrings;
