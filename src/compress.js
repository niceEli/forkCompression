import fs from "node:fs";
import brotli from "brotli";
import { encrypt } from "node-encryption";

import { muint8 } from "gomooe";
const { UInt8E } = muint8;

function verify(s1 = '', s2 = '') {
  let res = true;
  for (let i = 0; i < s1.length; i++) if (s1[i] !== s2[i]) res = false;
  return res;
}

/**
 * @param {string} file
 * @param {muint8.MUint8} encoder
 * @param {*} fileData
 * @param {string} password
 */
export default function compress(file, encoder, fileData, password) {
  let finalFile = file + ".fc";
  
  console.log(`${file} -> ${finalFile}`);
  
  let encodedFile = encoder.encode(fileData, -1);
  let encodedStr = UInt8E.decodeUint8(encodedFile);
  let brEncode = brotli.compress(encodedStr);

  let decodedLayer = UInt8E.encodeUint8(encodedStr);
  let decodedFile = encoder.decode(decodedLayer);
  console.log(
    verify(decodedFile, fileData),
    verify(decodedLayer, encodedFile)
  )

  console.log(decodedFile, fileData)

  console.log(brEncode);
  console.log(typeof brEncode);
  
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
  
  console.log("Done!");
}