const [nb] = process.argv.slice(2);

function numToArr(n) {
  return Array.from(String(n)).map((s) => Number(s));
}

function sortNumberStrings(n1, n2) {
  n1 = String(n1);
  n2 = String(n2);
  if (n1.length !== n2.length) {
    big = n1.length > n2.length ? n1 : n2;
    little = n1.length > n2.length ? n2 : n1;
  } else {
    const n1Values = {
      str: n1,
      nbToCompare: String(Number(n1)).includes("e+")
        ? String(Number(n1)).split("e+")[0]
        : Number(n1),
    };
    const n2Values = {
      str: n2,
      nbToCompare: String(Number(n2)).includes("e+")
        ? Number(String(Number(n2)).split("e+")[0])
        : Number(n2),
    };

    big =
      n1Values.nbToCompare > n2Values.nbToCompare ? n1Values.str : n2Values.str;
    little =
      n1Values.nbToCompare > n2Values.nbToCompare ? n2Values.str : n1Values.str;
  }
  return [big, little];
}

function multiplyToAdditionArr(n1, n2) {
  let [big, little] = sortNumberStrings(n1, n2);
  big = numToArr(big);
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

function multiplication(arr) {
  let toMultiplyArr = [];
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
    toMultiplyArr.push(additionedStr);
  }

  if (toMultiplyArr.length === 1) {
    return toMultiplyArr[0];
  }
  return multiplication(toMultiplyArr);
}

function factoriel(n) {
  n = Number(n);
  if (n === 0) {
    return "1";
  }
  const numbersToMultiply = [];
  for (let i = 0; i < n; i++) {
    numbersToMultiply.push(i + 1);
  }
  return multiplication(numbersToMultiply.map((n) => String(n)));
}

console.log(factoriel(nb));
