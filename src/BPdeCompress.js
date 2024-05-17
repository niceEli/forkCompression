import { fdatasync } from "node:fs";
import zlib from "zlib";

import gradule from "gradule";

import { muint8 } from "gomooe";
import { decrypt } from "node-encryption";
const { UInt8E } = muint8;

import { logVerification } from "./logVerification.js";
import { makeDecompressedFile } from "./makeDecompressedFile.js";
import { removeLastExt } from "./removeLastExt.js";
import { verify } from "./verify.js";

import { makeGMClient } from "./makeGMClient.js";

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

  let gmClient = makeGMClient();

  let unsignedFile = fileSign.unsignText(fileData.toString());
  console.log(unsignedFile.flags);

  let data = unsignedFile.text;
  let hasPassword = !!unsignedFile.flags[0];
  let passwordUsed = !!password;
  if (!passwordUsed && hasPassword)
    throw new Error("Password is required for this file");

  if (passwordUsed && hasPassword)
    data = Buffer.from(decrypt(data.toString(), password));
  else if (passwordUsed) console.warn("Password is not required for this file");

  if (process.env.debug) {
    console.log(data.toString());
    console.log(typeof data);
  }

  let bpDecode = gmClient.decode(data, process.env.debug).decodedString;
  let brDecode = encoder.decode(UInt8E.encodeUint8(bpDecode));

  logVerification(bpDecode, cPr);

  makeDecompressedFile(finalFile, replaceFile, brDecode);

  cPr("Done!");
}
