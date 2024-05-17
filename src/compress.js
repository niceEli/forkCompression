// import brotli from "brotli";
import { encrypt } from "node-encryption";

import gradule from "gradule";

import { muint8 } from "gomooe";
const { UInt8E } = muint8;

import { logVerification } from "./logVerification.js";
import { makeCompressedFile } from "./makeCompressedFile.js";
import { displayFlags } from "./displayFlags.js";

import fileSign from "./filesign.js";

const cPr = (x) => gradule.preset.retro.print(x.toString());

const EXTENSION = "fc";

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
  cPr(`>  ${file} -> ${file}.${EXTENSION}`);

  let encodedFile = encoder.encode(fileData, -1);
  let encodedStr = UInt8E.decodeUint8(encodedFile);
  let brEncode = /* brotli.compress */ encodedStr;

  if (process.env.debug) {
    displayFlags(cPr, password, replaceFile, false);

    let decodedFile = encoder.decode(encodedFile);
    logVerification(encodedStr, encodedFile);
    logVerification(decodedFile, fileData);

    console.log();
    console.log(brEncode);
    console.log(typeof brEncode);
  }

  let data = brEncode;
  if (password !== undefined) data = encrypt(data, password);

  let signedFile = fileSign.signToText(data, !!password, false);

  makeCompressedFile(file, replaceFile, signedFile, EXTENSION).then(() => {
    cPr(">  Done!");
    process.exit(0);
  });
}
