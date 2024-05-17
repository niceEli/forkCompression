import { encrypt } from "node-encryption";

import gradule from "gradule";

import { muint8 } from "gomooe";
const { UInt8E } = muint8;

import { logVerification } from "./logVerification.js";
import { makeCompressedFile } from "./makeCompressedFile.js";
import { verify } from "./verify.js";

import fileSign from "./filesign.js";
import { makeGMClient } from "./makeGMClient.js";

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
export default function BPcompress(
  file,
  encoder,
  fileData,
  password,
  replaceFile,
) {
  cPr(`>  ${file} -> ${file}.${EXTENSION}`);

  let gmClient = makeGMClient();

  let encodedStr = UInt8E.decodeUint8(encoder.encode(fileData));
  let bpEncode = gmClient.encode(encodedStr, process.env.debug);
  let brEncode = bpEncode.encodedString;

  if (process.env.debug) {
    let decodedFile = encoder.decode(decodedLayer);

    logVerification(encodedStr, fileData);
    logVerification(decodedFile, fileData);

    console.log(bpEncode);
    console.log(typeof bpEncode);
    console.log(brEncode);
    console.log(typeof brEncode);
  }

  let data = brEncode;
  if (password !== undefined) data = encrypt(data, password);

  let signedFile = fileSign.signToText(data, !!password, true);

  makeCompressedFile(file, replaceFile, signedFile, EXTENSION);

  cPr(">  Done!");
}
