import fs from "node:fs";
// import brotli from "brotli";
import { encrypt } from "node-encryption";

import gradule from "gradule";

import { muint8 } from "gomooe";
import { verify } from "./verify.js";
const { UInt8E } = muint8;

/**
 * @param {string} file
 * @param {muint8.MUint8} encoder
 * @param {*} fileData
 * @param {string} password
 */
export default function compress(file, encoder, fileData, password) {
  let finalFile = file + ".fc";

  const cPr = (x) => gradule.preset.retro.print(x.toString());

  cPr(`${file} -> ${finalFile}`);

  let encodedFile = encoder.encode(fileData, -1);
  let encodedStr = UInt8E.decodeUint8(encodedFile);
  let brEncode = /* brotli.compress */(encodedStr);

  {
    // @ Verification
    let decodedLayer = UInt8E.encodeUint8(encodedStr);

    let verifyResults = [verify(decodedLayer, encodedFile)];

    cPr(`Verified: ${verifyResults.join(" | ")}`);
  }

  let data = brEncode;
  if (password !== undefined) data = encrypt(data, password);

  let lastName = finalFile;
  // let dupeId = 1;
  // while (fs.existsSync(lastName)) {
  //   lastName = `${file} (${dupeId}).fc`;
  //   dupeId++;
  // }

  fs.writeFile(lastName, data, (err) => {
    if (err) throw err;
  });

  cPr("Done!");
}
