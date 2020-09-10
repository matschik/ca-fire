const [nb] = process.argv.slice(2);

function numToArr(n) {
  return Array.from(String(n)).map((s) => Number(s));
}

function multiplyToAdditionArr(n1, n2) {
  const sortedNumbers = [n1, n2].sort();
  const little = sortedNumbers[0];
  const big = numToArr(sortedNumbers[1]);

  let sumArr = [];
  for (let i = 0; i < big.length; i++) {
    const bigDigit = big[big.length - (i + 1)];

    let sumStr = String(bigDigit * little);
    // Ajout des zéros
    for (const _ of Array(i)) {
      sumStr += "0";
    }

    sumArr.push(sumStr);
  }

  return sumArr;
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
  const sortedNumbers = [n1, n2].sort();
  const little = numToArr(sortedNumbers[0]);
  const big = numToArr(sortedNumbers[1]);
  for (let i = 0; i < big.length; i++) {
    const littleNumber = little[little.length - (i + 1)] || 0;
    additionedArr.unshift(applyCarry(big[big.length - (i + 1)] + littleNumber));
  }

  return additionedArr.join("");
}

//console.log(additionToStr("126", "1680"));

// console.log(multiplyToAdditionArr(132, 213), 132 * 213);
// console.log(multiplyToAdditionArr(213, 5), 5 * 213);
// console.log(multiplyToAdditionArr(5444, 213), 5444 * 213);
// console.log(multiplyToAdditionArr(312132211412, 4332423), 312132211412 * 4332423);
// console.log(multiplyToAdditionArr(99999, 999), 99999 * 999);
// console.log(multiplyToAdditionArr(12345, 678), 12345 * 678);

function rec(n) {
  let allAdditionArr = [];
  let additionArr;
  for (let i = 1; i < Number(n) + 1; i += 2) {
    const number = i;
    const nextNumber = (i || 0) + 1;
    additionArr = multiplyToAdditionArr(number, nextNumber);
    let [a1, a2] = additionArr;
    a2 = a2 === undefined ? "0" : a2;
    const additionedStr = additionToStr(a1, a2)
    allAdditionArr.push(additionedStr);
    console.log({ multiply: `${number} * ${nextNumber}`, additionedStr });
  }
  return allAdditionArr
}

function facto(n) {
  const numbersToMultiply = [];
  for (let i = 1; i < Number(n) + 1; i++) {
    numbersToMultiply.push(i);
  }
  return rec(n)
}

console.log(facto(nb));
