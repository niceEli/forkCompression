import eobj from "gomooe/muint8/muint8.js";

import fs from "node:fs";

import compress from "./compress.js";
import deCompress from "./deCompress.js";

export default async function main() {
  let encoder = new eobj.MUint8Encoder();
  const file = process.argv[2];
  const password = process.argv[3];
  console.log(file);
  if (file == undefined) {
    console.log("Usage: forc <file> [password]");
    process.exit(1);
  }
  let fileData;
  fs.readFile(process.cwd() + "/" + file, (err, data) => {
    if (err) throw err;
    if (data) {
      fileData = data;
      if (file.endsWith(".fc")) {
        deCompress(file, encoder, fileData, password);
      }
      if (!file.endsWith(".fc")) {
        compress(file, encoder, fileData, password);
      }
    }
  });
}
