import fs from "node:fs";
import brotli from "brotli";
import { encrypt, decrypt } from "node-encryption";
export default function compress(file, encoder, fileData, password) {
  let finalFile = file + ".fc";
  console.log(`${file} -> ${finalFile}`);
  let data = fileData;
  if (password !== undefined) {
    data = encrypt(data, password);
  }
  let encodedFile = encoder.encode(data, -1);
  let brEncode = brotli.compress(encodedFile);
  fs.writeFile(finalFile, brEncode, (err) => {
    if (err) throw err;
  });
  console.log("Done!");
}
