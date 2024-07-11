import { muint8 } from "gomooe";
import { decrypt } from "node-encryption";

import { logVerification } from "./logVerification.js";
import { makeDecompressedFile } from "./makeDecompressedFile.js";
import { processDecoding } from "./processEncoding.js";
import { removeLastExt } from "./removeLastExt.js";
import { displayFlags } from "./displayFlags.js";

import fileSign from "./filesign.js";
import { dcPr } from "./cPr.js";

/**
 * @param {string} file
 * @param {muint8.MUint8} encoder
 * @param {*} fileData
 * @param {string} password
 *
 * @param {boolean} replaceFile
 */
export default function BPdeCompress(
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

  let hasPassword = !!flags[0];
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

  let { gmClient, bpDecode, brDecode } = processDecoding(encoder, data);

  logVerification(bpDecode, dcPr);

  makeDecompressedFile(finalFile, replaceFile, brDecode).then(() => {
    dcPr(">  Done!");
    process.exit(0);
  });
}
