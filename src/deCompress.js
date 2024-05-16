import gradule from "gradule";
// import brotli from "brotli";

import { fdatasync } from "node:fs";

import { muint8 } from "gomooe";
import { decrypt } from "node-encryption";
const { UInt8E } = muint8;

import { logVerification } from "./logVerification.js";
import { makeDecompressedFile } from "./makeDecompressedFile.js";
import { removeLastExt } from "./removeLastExt.js";
import { verify } from "./verify.js";

const cPr = (x) => gradule.preset.wedding_day_blues.print(x.toString());

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
