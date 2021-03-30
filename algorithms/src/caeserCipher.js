const caeserCipher = (str, num) => {
  const newNum = num % 26;
  const az = "abcdefghijklmnopqrstuvwxyz";
  const lower = str.toLowerCase();
  let letter;
  let currentIndex = 0;
  let newIndex = 0;
  let updated = "";
  for (var i = 0; i < str.length; i++) {
    letter = lower[i];
    currentIndex = az.indexOf(letter);
    newIndex = currentIndex + newNum;

    if (letter === " ") {
      updated += " ";
      continue;
    }

    if (newIndex > 25) {
      newIndex = newIndex - 25;
    } else if (newIndex < 0) {
      newIndex = newIndex + 25;
    }

    if (str[i] === str[i].toUpperCase()) {
      updated += az[newIndex].toUpperCase();
    } else {
      updated += az[newIndex];
    }
  }

  return updated;
};

module.exports = caeserCipher;
