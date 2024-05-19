import { muint8 } from "gomooe";
const { UInt8E } = muint8;

import { logVerification } from "./logVerification.js";

// This file can (hopefully) be shipped to web as an entrypoint.
/**
 * @param {muint8.MUint8} encoder
 * @param {*} fileData
 */
export function fcCompress(encoder, fileData) {
  let encodedFile = encoder.encode(fileData, -1);
  let encodedStr = UInt8E.decodeUint8(encodedFile);
  let brEncode = /* brotli.compress */ encodedStr;

  if (typeof process !== "undefined" && process.env.debug) {
    let decodedFile = encoder.decode(encodedFile);
    logVerification(encodedStr, encodedFile);
    logVerification(decodedFile, fileData);

    console.log();
    console.log(brEncode);
    console.log(typeof brEncode);
  }

  return brEncode;
}

/**
 * @param {muint8.MUint8} encoder
 * @param {*} fileData
 */
export function fcDecompress(encoder, fileData) {
  let brDecode = /* brotli.decompress */ fileData;
  let unEncodedStr = UInt8E.encodeUint8(brDecode);
  let unEncodedFile = encoder.decode(unEncodedStr);

  if (typeof process !== "undefined" && process.env.debug) {
    console.log(data.toString());
    console.log(typeof data);
  }

  return unEncodedFile;
}
