import fs, { fdatasync } from "node:fs";
import brotli from "brotli";
import { decrypt } from "node-encryption";

import { muint8 } from "gomooe";
const { UInt8E } = muint8;

const removeLastExt = (f = "") => {
  const lastIndex = f.lastIndexOf(".");
  return {
    filename: f.slice(0, lastIndex),
    ext: f.slice(lastIndex + 1),
  };
};

/**
 * @param {string} file
 * @param {muint8.MUint8} encoder
 * @param {*} fileData
 * @param {string} password
 */
export default function deCompress(file, encoder, fileData, password) {
  let finalFile = removeLastExt(file).filename;

  console.log(`${file} -> ${finalFile}`);

  let data = fileData;
  if (password !== undefined)
    data = Buffer.from(decrypt(data.toString(), password));

  console.log(data.toString());
  console.log(typeof data);

  let brDecode = brotli.decompress(data);
  let unEncodedStr = UInt8E.encodeUint8(brDecode);
  let unEncodedFile = encoder.decode(unEncodedStr);

  let lastName = finalFile;
  // let dupeId = 1;
  // let { filename, ext } = removeLastExt(finalFile);
  // while (fs.existsSync(lastName)) {
  //   lastName = `${filename} (${dupeId}).${ext}`;
  //   dupeId++;
  // }

  fs.writeFile(lastName, unEncodedFile, (err) => {
    if (err) throw err;
  });

  console.log("Done!");
}
