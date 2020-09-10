const [sentence] = process.argv.slice(2);

let formattedSentence = "";
let toUppercase = false;
for (const letter of sentence) {
  if (toUppercase) {
    formattedSentence += letter.toUpperCase();
  } else {
    formattedSentence += letter.toLowerCase();
  }
  if (letter !== " ") {
    toUppercase = !toUppercase;
  }
}
console.log(formattedSentence);
