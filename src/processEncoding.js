import { makeGMClient } from "./makeGMClient.js";
import { muint8 } from "gomooe";
const { UInt8E } = muint8;

// This file can be bundled as the entrypoint and shipped to the web.

/**
 * @param {muint8.MUint8} encoder
 * @param {*} fileData
 */
export function processDecoding(encoder, data) {
  let gmClient = makeGMClient();

  let bpDecode = gmClient.decode(data, process.env.debug).decodedString;
  let brDecode = encoder.decode(UInt8E.encodeUint8(bpDecode));
  return { gmClient, bpDecode, brDecode };
}

/*
 * @param {muint8.MUint8} encoder
 * @param {*} fileData
 */
export function processEncoding(encoder, fileData) {
  let gmClient = makeGMClient();

  let encodedStr = UInt8E.decodeUint8(encoder.encode(fileData));
  let bpEncode = gmClient.encode(encodedStr, process.env.debug);
  let brEncode = bpEncode.encodedString;
  return { encodedStr, bpEncode, brEncode };
}
