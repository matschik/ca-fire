const [nb] = process.argv.slice(2);

let fck = false;

function numToArr(n) {
  return Array.from(String(n)).map((s) => Number(s));
}

function sortNumberStrings(n1, n2) {
  if (n1.length !== n2.length) {
    big = n1.length > n2.length ? n1 : n2;
    little = n1.length > n2.length ? n2 : n1;
  } else {
    const sortedNumbers = sortNumbers([Number(n1), Number(n2)]);
    big = sortedNumbers[1];
    little = sortedNumbers[0];
  }
  return [big, little];
}

function multiplyToAdditionArr(n1, n2) {
  let [big, little] = sortNumberStrings(n1, n2);
  big = numToArr(big);
  if (fck) {
    console.log("multiply", { n1, n2 });
  }
  let additionArr = [];
  for (let i = 0; i < big.length; i++) {
    const bigDigit = big[big.length - (i + 1)];

    let additionStr = String(bigDigit * little);
    // Ajout des zéros
    for (const _ of Array(i)) {
      additionStr += "0";
    }

    if (Number(additionStr) === 0) {
      additionStr = "0";
    }
    additionArr.push(additionStr);
  }

  return additionArr;
}

function sortNumbers(numbers) {
  return numbers.sort((a, b) => a - b);
}

function additionToStr(n1, n2) {
  let carry = 0;
  function applyCarry(int) {
    int += carry;
    carry = 0;
    const intStr = String(int);
    if (intStr.length > 1) {
      carry = Number(intStr[0]);
      int = intStr[1];
    }
    int = String(int);
    return int;
  }

  let additionedArr = [];

  // Determine big & little
  const [big, little] = sortNumberStrings(n1, n2);
  const bigArr = numToArr(big);
  const littleArr = numToArr(little);

  for (let i = 0; i < bigArr.length; i++) {
    const littleDigit = littleArr[littleArr.length - (i + 1)] || 0;
    const bigDigit = bigArr[bigArr.length - (i + 1)] || 0;
    const sumOfDigit = bigDigit + littleDigit;
    additionedArr.unshift(applyCarry(sumOfDigit));
  }

  if (carry) {
    additionedArr.unshift(carry);
  }

  return additionedArr.join("");
}

function rec(arr) {
  let toMultiplyArr = [];
  if(fck){
    console.log({arrLength: arr.length})
  }
  for (let i = 0; i < arr.length; i += 2) {
    const number = arr[i];
    let nextNumber = arr[i + 1];
    if (nextNumber === undefined) {
      toMultiplyArr.push(number);
      continue;
    }

    const additionArr = multiplyToAdditionArr(number, nextNumber);
    const additionedStr = additionArr.reduce((acc, val) => {
      return additionToStr(acc, val);
    }, 0);
    const additioned = additionArr.reduce((acc, val) => acc + Number(val), 0);
    if (Number(additionedStr) !== additioned) {
      fck = true;
      console.log({
        multiplication: `${number} * ${nextNumber}`,
        additionArr,
        additionedStr,
        additioned,
      });
    }
    toMultiplyArr.push(additionedStr);
  }

  // debug
  if (fck) {
    console.log({ toMultiplyArr });
  }

  if (toMultiplyArr.length === 1) {
    const str = toMultiplyArr[0];
    const goodStr = "1,405,006,117,752,879,898,543,142,606,244,511,569,936,384,000,000,000"
      .split(",")
      .join("");
    return {
      number: Number(str),
      str,
      isEqual: str === goodStr,
      goodNumber: 1.4050061177528798e+51,
      goodStr,
    };
  }
  return rec(toMultiplyArr);
}

function facto(n) {
  const numbersToMultiply = [];
  for (let i = 1; i < Number(n) + 1; i++) {
    numbersToMultiply.push(i);
  }
  return rec(numbersToMultiply.map((n) => String(n)));
}

console.log(facto(nb));
