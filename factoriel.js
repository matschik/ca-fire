const [nb] = process.argv.slice(2);

let result = 1;
for (let i = 1; i < Number(nb) + 1; i++) {
  result = i * result;
}

console.log(result);
