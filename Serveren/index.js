const os = require("os");
const path = require("path");
const calculate = require("./calculate");
console.log(path.parse(__filename));
console.log(calculate.add(5, 3));
console.log(calculate.subtract(5, 3));
console.log(calculate.multiply(5, 3));
console.log(calculate.divide(5, 3));
