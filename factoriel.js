let [nb] = process.argv.slice(2);

nb = Number(nb)

function factoriel(number) {
  if (number === 0) {
    return 1;
  }
  return number * factoriel(number - 1);
}

console.log(factoriel(nb));
