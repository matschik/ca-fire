const fs = require("fs");

const [file] = process.argv.slice(2);

const fileContent = fs.readFileSync(file, "utf8");

const SUDOKU_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const sudoku = fileContent;

// I) SUDOKU LINES
const sudokuLines = sudoku
  .replace(/(-|\+|\|)/g, "")
  .split("\n")
  .filter((s) => s);

function getDigitPossibilitiesFromSequence(sequence) {
  return [...SUDOKU_DIGITS].filter((digit) => !sequence.includes(digit));
}

// lister les possibilités sur une ligne
function getLineDigitPossibilities(lineNumber) {
  return getDigitPossibilitiesFromSequence(sudokuLines[lineNumber]);
}

// II) SUDOKU COLUMNS
// lister les possibilités sur une colonne
const sudokuColumns = [];
const nbColumns = sudokuLines[0].length;
for (let i = 0; i < nbColumns; i++) {
  let column = "";
  for (const sudokuLine of sudokuLines) {
    column += Array.from(sudokuLine)[i];
  }
  sudokuColumns.push(column);
}

function getColumnDigitPossibilities(columnNumber) {
  return getDigitPossibilitiesFromSequence(sudokuColumns[columnNumber]);
}

// III) SUDOKU SQUARES
// lister les possibilités dans carré de 9
const sudokuSquares = [];
for (const startIndex of [0, 3, 6]) {
  let nextSquare = [];
  for (const sudokuLine of sudokuLines) {
    const threeDigits = Array.from(sudokuLine)
      .slice(startIndex, startIndex + 3)
      .join("");
    nextSquare.push(threeDigits);
    if (nextSquare.length === 3) {
      sudokuSquares.push(nextSquare.join(""));
      nextSquare = [];
    }
  }
}

function getSquareDigitPossibilities(squareNumber) {
  return getDigitPossibilitiesFromSequence(sudokuSquares[squareNumber]);
}

// console.log({ sudokuLines, sudokuColumns, sudokuSquares });

// IV) UNKNOWN COORDINATES
// Determine all unknown coordinates: line number, column number, square number
let unknownsCoordinates = [];

// Determine line number & column number
for (let i = 0; i < sudokuLines.length; i++) {
  const sudokuLine = sudokuLines[i];
  for (let j = 0; j < sudokuLine.length; j++) {
    const digit = sudokuLine[j];
    if (digit === "_") {
      unknownsCoordinates.push({
        line: i,
        column: j,
        square: undefined,
      });
    }
  }
}

// Determine square number from line number & column number
const squaresCoordinates = {};
let lineBaseIndex = 0;
let columnIndex = 0;
for (let i = 0; i < sudokuSquares.length; i++) {
  if ([3, 6].includes(i)) {
    columnIndex += 3;
  }
  squaresCoordinates[i] = {
    columns: [columnIndex, columnIndex + 1, columnIndex + 2],
    lines: [lineBaseIndex, lineBaseIndex + 1, lineBaseIndex + 2],
  };
  lineBaseIndex += 3;
  if (lineBaseIndex === 9) {
    lineBaseIndex = 0;
  }
}

//console.dir({ squaresCoordinates }, { depth: null });

function getSquareNumberFromLineAndColumn(lineNumber, columnNumber) {
  for (const squareNumber in squaresCoordinates) {
    const squareCoordinates = squaresCoordinates[squareNumber];
    if (
      squareCoordinates.lines.includes(lineNumber) &&
      squareCoordinates.columns.includes(columnNumber)
    ) {
      return Number(squareNumber);
    }
  }
}

unknownsCoordinates = unknownsCoordinates.map((coordinates) => {
  coordinates.square = getSquareNumberFromLineAndColumn(
    coordinates.line,
    coordinates.column
  );
  return coordinates;
});

// Assign possibilities on coordinates and determine solution
function intersectionOfPrimitiveArrays(...arrs) {
  let intersection = arrs[0];
  for (let i = 1; i < arrs.length; i++) {
    const arr = arrs[i];
    intersection = intersection.filter((intersectionElement) =>
      arr.includes(intersectionElement)
    );
  }
  return intersection;
}

unknownsCoordinates = unknownsCoordinates.map((coordinates) => {
  coordinates.linePossibilities = getLineDigitPossibilities(coordinates.line);
  coordinates.columnPossibilities = getColumnDigitPossibilities(
    coordinates.column
  );
  coordinates.squarePossibilities = getSquareDigitPossibilities(
    coordinates.square
  );

  coordinates.solution = intersectionOfPrimitiveArrays(
    coordinates.linePossibilities,
    coordinates.columnPossibilities,
    coordinates.squarePossibilities
  )[0];
  return coordinates;
});

// console.dir({ unknownsCoordinates }, { depth: null });

// V) SUDOKU RESOLVED
// Display sudoku resolved
let sudokuResolved = sudoku;
for (const unknownCoordinates of unknownsCoordinates) {
  sudokuResolved = sudokuResolved.replace("_", unknownCoordinates.solution);
}

console.log(sudokuResolved);
