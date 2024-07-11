import { encrypt } from "node-encryption";

import { muint8 } from "gomooe";

import { makeCompressedFile } from "./makeCompressedFile.js";
import { displayFlags } from "./displayFlags.js";
import { processEncoding } from "./processEncoding.js";

import fileSign from "./filesign.js";
import { ccPr } from "./cPr.js";

const EXTENSION = "fc";

/**
 * @param {string} file
 * @param {typeof muint8.MUint8} encoder
 * @param {*} fileData
 * @param {string} password
 *
 * @param {boolean} replaceFile
 */
export default function BPcompress(
  file,
  encoder,
  fileData,
  password,
  replaceFile,
) {
  ccPr(`>  ${file} -> ${file}.${EXTENSION}`);

  let { encodedStr, bpEncode, brEncode } = processEncoding(encoder, fileData);

  if (process.env.debug) {
    displayFlags(ccPr, password, replaceFile, true);

    console.log();
    console.log(bpEncode);
    console.log(typeof bpEncode);
    console.log(brEncode);
    console.log(typeof brEncode);
  }

  let data = brEncode;
  if (password !== undefined) data = encrypt(data, password);

  let signedFile = fileSign.signToText(data, !!password, true);

  makeCompressedFile(file, replaceFile, signedFile, EXTENSION).then(() => {
    ccPr(">  Done!");
    process.exit(0);
  });
}
