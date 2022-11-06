/*

ransom note function (note (string), magazine (string))
  var can make note (bool) = true
  var magazine (map)
  var noteArray (array)
  var magazineArray (array)

  noteArray = split characters of note into Array
  magazineArray = split magazine characters into Array

  for char of magazineArray
    if magazine map does not contain char
      set the char on the map with a value of 1
    endif
  endfor

  for char of noteArray
    if magazineMap has char
      decrement the value of char on magazine map
      if value of char on magazine map is less than 0
        can make note = false
      endif
    else
      can make note = false
    endif
  endfor

  return can make note
end function

*/

const harmlessRansomNote = (note, magazine) => {
  var canMakeNote = true;
  var magazineMap = new Map();
  var noteArray;
  var magazineArray;

  noteArray = note.split("");
  magazineArray = magazine.split("");

  magazineArray.forEach((char) => {
    if (!magazineMap.has(char)) {
      magazineMap.set(char, 0);
    }
    magazineMap.set(char, magazineMap.get(char) + 1);
  });

  noteArray.forEach((char) => {
    if (magazineMap.has(char)) {
      magazineMap.set(char, magazineMap.get(char) - 1);
      if (magazineMap.get(char) < 0) {
        canMakeNote = false;
      }
    } else {
      canMakeNote = false;
    }
  });

  return canMakeNote;
};

module.exports = harmlessRansomNote;
