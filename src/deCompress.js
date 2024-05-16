import gradule from "gradule";
// import brotli from "brotli";

import fs, { fdatasync } from "node:fs";

import { decrypt } from "node-encryption";
import { muint8 } from "gomooe";
import { verify } from "./verify.js";

const { UInt8E } = muint8;
const cPr = (x) => gradule.preset.wedding_day_blues.print(x.toString());

const removeLastExt = (f = "") => {
  const lastIndex = f.lastIndexOf(".");
  return {
    filename: f.slice(0, lastIndex),
    ext: f.slice(lastIndex + 1),
  };
};

function logVerification(unEncodedStr, cPr) {
  {
    let decodedLayer = UInt8E.decodeUint8(unEncodedStr);
    let verifyResults = [verify(decodedLayer, unEncodedStr)];

    cPr(`Verified: ${verifyResults.join(" | ")}`);
  }
}

function makeDecompressedFile(finalFile, replaceFile, unEncodedFile) {
  let lastName = finalFile;
  // Make duplicates
  if (!replaceFile) {
    let dupeId = 1;
    let { filename, ext } = removeLastExt(finalFile);
    while (fs.existsSync(lastName)) {
      lastName = `${filename} (${dupeId}).${ext}`;
      dupeId++;
    }
  }

  fs.writeFile(lastName, unEncodedFile, (err) => {
    if (err) throw err;
  });
}

/**
 * @param {string} file
 * @param {muint8.MUint8} encoder
 * @param {*} fileData
 * @param {string} password
 *
 * @param {boolean} replaceFile
 */
export default function deCompress(
  file,
  encoder,
  fileData,
  password,
  replaceFile,
) {
  let finalFile = removeLastExt(file).filename;

  cPr(`${file} -> ${finalFile}`);

  let data = fileData;
  if (password !== undefined)
    data = Buffer.from(decrypt(data.toString(), password));

  let brDecode = /* brotli.decompress */ data;
  let unEncodedStr = UInt8E.encodeUint8(brDecode);
  let unEncodedFile = encoder.decode(unEncodedStr);

  logVerification(unEncodedStr, cPr);

  makeDecompressedFile(finalFile, replaceFile, unEncodedFile);

  cPr("Done!");
}
