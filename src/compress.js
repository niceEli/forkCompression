import fs from "node:fs";
// import brotli from "brotli";
import { encrypt } from "node-encryption";

import gradule from "gradule";

import { muint8 } from "gomooe";
import { verify } from "./verify.js";
const { UInt8E } = muint8;

const cPr = (x) => gradule.preset.retro.print(x.toString());

function logVerification(encodedStr, encodedFile) {
  let decodedLayer = UInt8E.encodeUint8(encodedStr);
  let verifyResults = [verify(decodedLayer, encodedFile)];

  cPr(`>  Verified: ${verifyResults.join(" | ")}`);
}

function makeCompressedFile(finalFile, replaceFile, file, data) {
  let lastName = finalFile;
  let ext = 'fc'

  // Make duplicates
  let dupeId = 1;
  if (!replaceFile)
    while (fs.existsSync(lastName)) {
      lastName = `${file} (${dupeId}).${ext}`;
      dupeId++;
    }

  fs.writeFile(lastName, data, (err) => {
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
export default function compress(
  file,
  encoder,
  fileData,
  password,
  replaceFile,
) {
  let finalFile = file + ".fc";

  cPr(`>  ${file} -> ${finalFile}`);

  let encodedFile = encoder.encode(fileData, -1);
  let encodedStr = UInt8E.decodeUint8(encodedFile);
  let brEncode = /* brotli.compress */ encodedStr;

  logVerification(encodedStr, encodedFile);

  let data = brEncode;
  if (password !== undefined) data = encrypt(data, password);

  makeCompressedFile(finalFile, replaceFile, file, data);

  cPr(">  Done!");
}
