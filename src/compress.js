import fs from "node:fs";
import brotli from "brotli";
import { encrypt } from "node-encryption";
export default function compress(file, encoder, fileData, password) {
  let finalFile = file + ".fc";
  console.log(`${file} -> ${finalFile}`);
  let encodedFile = encoder.encode(fileData, -1);
  let data = encodedFile;
  if (password !== undefined) {
    data = encrypt(data, password).toString();
  }
  fs.writeFile(finalFile, data, (err) => {
    if (err) throw err;
  });
  console.log("Done!");
}
