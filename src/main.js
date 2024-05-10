import { muint8 } from "gomooe";

import fs from "node:fs";

import compress from "./compress.js";
import deCompress from "./deCompress.js";

export default async function main() {
  const encoder = new muint8.MUint8Encoder();

  if (process.env.debug)
    console.log(
      "Debug mode enabled!!!\nExpect Console To Be Flushed!\nGet Ready For Tons Of Logs!"
    );

  const file = process.argv[2];
  const password = process.argv[3];

  if (file == undefined) {
    console.log("Usage: forc <file> [password]");
    process.exit(1);
  }

  fs.readFile(process.cwd() + "/" + file, (err, data) => {
    if (err) throw err;

    if (data)
      if (file.endsWith(".fc")) deCompress(file, encoder, data, password);
      else compress(file, encoder, data, password);
  });
}
