// import brotli from "brotli";
import { encrypt } from "node-encryption";

import gradule from "gradule";

import { muint8 } from "gomooe";
const { UInt8E } = muint8;

import { makeCompressedFile } from "./makeCompressedFile.js";
import { displayFlags } from "./displayFlags.js";

import { fcCompress } from "./FCmethods.js";
import { ccPr } from "./cPr.js";

import fileSign from "./filesign.js";

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
  ccPr(`>  ${file} -> ${file}.${EXTENSION}`);

  let brEncode = fcCompress(encoder, fileData);
  if (process.env.debug) displayFlags(ccPr, password, replaceFile, false);

  let data = brEncode;
  if (password !== undefined) data = encrypt(data, password);

  let signedFile = fileSign.signToText(data, !!password, false);

  makeCompressedFile(file, replaceFile, signedFile, EXTENSION).then(() => {
    ccPr(">  Done!");
    process.exit(0);
  });
}
