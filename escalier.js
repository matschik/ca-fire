const [nbMaxSteps] = process.argv.slice(2);

let acc = "";
for (let i = 0; i < nbMaxSteps; i++) {
  acc += "#";
  console.log(acc);
}
