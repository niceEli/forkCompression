import fs from "node:fs";
import brotli from "brotli";
import { encrypt } from "node-encryption";
export default function compress(file, encoder, fileData, password) {
  let finalFile = file + ".fc";
  console.log(`${file} -> ${finalFile}`);
  let encodedFile = encoder.encode(fileData, -1);
  let brEncode = brotli.compress(encodedFile);
  let data = brEncode;
  if (password !== undefined) {
    data = encrypt(data, password);
  }
  fs.writeFile(finalFile, data, (err) => {
    if (err) throw err;
  });
  console.log("Done!");
}
