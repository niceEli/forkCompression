import fs from "node:fs";

import compress from "./compress.js";
import deCompress from "./deCompress.js";

import BPcompress from "./BPcompress.js";
import BPdeCompress from "./BPdeCompress.js";

import gradule from "gradule";

import { muint8 } from "gomooe";
import { findInArgs } from "./findInArgs.js";
import { getArgSet } from "./getArgSet.js";

function printJobText(file, password, replaceFile) {
  [
    `Starting ForkC Job for`,
    `\\__  ${file}`,
    `\\__  Password?:       ${password || '""'}`,
    `\\__  Replace Files?:  ${replaceFile}`,
    "",
  ].forEach((x) => gradule.preset.wiretap.print(x));
}

function doJob(file, encoder, password, replaceFile, bullpressMode) {
  printJobText(file, password, replaceFile);

  if (file == undefined) {
    gradule.preset.cherryblossoms.print("Usage: forc <file> <[args]>");
    process.exit(1);
  }

  fs.readFile(process.cwd() + "/" + file, (err, data) => {
    if (err) throw err;
    else if (!data) return;

    let compressed = file.endsWith(".fc");

    /** @type {[typeof BPcompress, typeof BPdeCompress] | [typeof compress, typeof deCompress]}*/
    let cbSet = !bullpressMode
      ? [compress, deCompress]
      : [BPcompress, BPdeCompress];

    /** @type {typeof BPcompress | typeof compress | typeof BPdeCompress | typeof deCompress} */
    let cb = !compressed ? cbSet[0] : cbSet[1];

    cb(file, encoder, data, password, replaceFile);
  });
}

export default async function main() {
  const encoder = new muint8.MUint8Encoder();

  if (process.env.debug)
    console.log(
      "Debug mode enabled!!!\nExpect Console To Be Flushed!\nGet Ready For Tons Of Logs!",
    );

  const file = process.argv[2];
  const password = getArgSet("-p") || getArgSet("--password");
  const replaceFile = findInArgs((x) => x === "-r" || x === "--replace");
  const bullpressMode = findInArgs(
    (x) => x === "-b" || x === "--bullpress" || x === "-bp",
  );

  doJob(file, encoder, password, replaceFile, bullpressMode);
}
