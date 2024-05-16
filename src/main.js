import fs from "node:fs";

import compress from "./compress.js";
import deCompress from "./deCompress.js";

import gradule from "gradule";
import filesign from "./filesign.js";

import { muint8 } from "gomooe";

const getArgSet = (x) => {
  var pos = 0,
    key = "";
  while (key !== x) {
    key = process.argv[pos];
    pos++;
    if (key === undefined) return;
  }
  return process.argv[pos];
};

function printJobText(file, password, replaceFile) {
  [
    `Starting ForkC Job for`,
    `\\__  ${file}`,
    `\\__  Password?:       ${password || '""'}`,
    `\\__  Replace Files?:  ${replaceFile}`,
    "",
  ].forEach((x) => gradule.preset.wiretap.print(x));
}

function doJob(file, encoder, password, replaceFile) {
  printJobText(file, password, replaceFile);

  if (file == undefined) {
    gradule.preset.cherryblossoms.print("Usage: forc <file> <[args]>");
    process.exit(1);
  }

  fs.readFile(process.cwd() + "/" + file, (err, data) => {
    if (err) throw err;
    else if (!data) return;

    if (file.endsWith(".fc"))
      deCompress(file, encoder, data, password, replaceFile);
    else compress(file, encoder, data, password, replaceFile);
  });
}

export default async function main() {
  const encoder = new muint8.MUint8Encoder();

  const file = process.argv[2];
  const password = getArgSet("-p") || getArgSet("--password");

  const replaceFile = !!process.argv.find((x) => {
    if (x === "-r" || x === "--replace") return true;
    else return false;
  });

  doJob(file, encoder, password, replaceFile);
}
