const fs = require("fs");

const [wordGuess, file] = process.argv.slice(2);

const fileContent = fs.readFileSync(file, "utf8");

const words = fileContent.split("\n");

const wordGuessAnagramms = [];

for (const word of words) {
  let isAnagramm = true;
  const wordGuessLetters = Array.from(wordGuess);
  for (const letter of word) {
    if (wordGuessLetters.length === 0) {
      isAnagramm = false;
      break;
    }
    const wordGuessLetterIndex = wordGuessLetters.indexOf(letter);
    if (wordGuessLetterIndex > -1) {
      wordGuessLetters.splice(wordGuessLetterIndex, 1);
    }
  }
  if (wordGuessLetters.length > 0) {
    isAnagramm = false;
  }

  if (isAnagramm) {
    wordGuessAnagramms.push(word);
  }
}

if (wordGuessAnagramms.length > 0) {
  console.log(...wordGuessAnagramms);
}
