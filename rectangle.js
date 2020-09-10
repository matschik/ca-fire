const fs = require("fs");

const [file1, file2] = process.argv.slice(2);

const file1Content = fs.readFileSync(file1, "utf8");
const file2Content = fs.readFileSync(file2, "utf8");

const littleSquare = file1Content;
const littleSquareLines = littleSquare.split("\n");

const bigSquare = file2Content;
const bigSquareLines = bigSquare.split("\n");

function matchLittleSquare(initialBigLineIndex) {
  let matchLittleSquare = true;
  for (let i = 1; i < littleSquareLines.length; i++) {
    const bigSquareLine = bigSquareLines[initialBigLineIndex + i];
    if (!bigSquareLine) {
      matchLittleSquare = false;
      break;
    }
    const littleIndexInBigSquareLine = bigSquareLine.indexOf(
      littleSquareLines[i]
    );
    if (littleIndexInBigSquareLine === -1) {
      matchLittleSquare = false;
      break;
    }
  }
  return matchLittleSquare;
}

for (const [bigIndex, bigSquareLine] of bigSquareLines.entries()) {
  const littleIndexInBigSquareLine = bigSquareLine.indexOf(
    littleSquareLines[0]
  );
  if (littleIndexInBigSquareLine > -1) {
    if(matchLittleSquare(bigIndex)){
        console.log(`${littleIndexInBigSquareLine},${bigIndex}`)
        break;
    }
  }
}