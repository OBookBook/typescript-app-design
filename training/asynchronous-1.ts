import fs from "fs";
import util from "util";

const promisifyReadFile = util.promisify(fs.readFile);

function main() {
  let fileContent: string = "Not loaded";
  fs.readFile("package.json", (err, data) => {
    fileContent = data.toString();
    console.log(fileContent);
  });
  console.log(fileContent);
}

main();
