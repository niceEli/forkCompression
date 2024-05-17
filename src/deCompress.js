import { fdatasync } from "node:fs";
// import brotli from "brotli";

import gradule from "gradule";

import { muint8 } from "gomooe";
import { decrypt } from "node-encryption";
const { UInt8E } = muint8;

import { logVerification } from "./logVerification.js";
import { makeDecompressedFile } from "./makeDecompressedFile.js";
import { removeLastExt } from "./removeLastExt.js";
import { verify } from "./verify.js";

import fileSign from "./filesign.js";

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

  let unsignedFile = fileSign.unsignText(fileData);
  
  let data = unsignedFile.text;
  if (password !== undefined || unsignedFile.flags[0])
    data = Buffer.from(decrypt(data.toString(), password));

  if (process.env.debug) {
    console.log(data.toString());
    console.log(typeof data);
  }
  
  let brDecode = /* brotli.decompress */ data;
  let unEncodedStr = UInt8E.encodeUint8(brDecode);
  let unEncodedFile = encoder.decode(unEncodedStr);
  
  logVerification(unEncodedStr, cPr);

  makeDecompressedFile(finalFile, replaceFile, unEncodedFile);

  cPr("Done!");
}
