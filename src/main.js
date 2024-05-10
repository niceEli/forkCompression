import { muint8 } from "gomooe";

import fs from "node:fs";

import compress from "./compress.js";
import deCompress from "./deCompress.js";

import gradule from "gradule";

export default async function main() {
  const encoder = new muint8.MUint8Encoder();

  const file = process.argv[2];
  const password = process.argv[3];

  if (file == undefined) {
    gradule.preset.cherryblossoms.print("Usage: forc <file> [password]");
    process.exit(1);
  }

  fs.readFile(process.cwd() + "/" + file, (err, data) => {
    if (err) throw err;

    if (data)
      if (file.endsWith(".fc")) deCompress(file, encoder, data, password);
      else compress(file, encoder, data, password);
  });
}
