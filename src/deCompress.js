import { muint8 } from "gomooe";
import { decrypt } from "node-encryption";

import { logVerification } from "./logVerification.js";
import { makeDecompressedFile } from "./makeDecompressedFile.js";
import { removeLastExt } from "./removeLastExt.js";

import { displayFlags } from "./displayFlags.js";

import { fcDecompress } from "./FCmethods.js";
import { dcPr } from "./cPr.js";

import fileSign from "./filesign.js";

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

  dcPr(`${file} -> ${finalFile}`);

  let unsignedFile = fileSign.unsignText(fileData.toString());

  let flags = unsignedFile.flags;
  let data = unsignedFile.text;
  !!flags && displayFlags(dcPr, ...flags);

  if (password !== undefined || flags[0])
    data = Buffer.from(decrypt(data.toString(), password));

  let unEncodedFile = fcDecompress(encoder, data);

  logVerification(unEncodedStr, dcPr);

  makeDecompressedFile(finalFile, replaceFile, unEncodedFile).then(() => {
    dcPr(">  Done!");
    process.exit(0);
  });
}
