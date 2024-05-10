import fs from "node:fs";
import brotli from "brotli";
import { encrypt, decrypt } from "node-encryption";
export default function deCompress(file, encoder, fileData, password) {
  let finalFile = file.slice(0, -3);
  console.log(`${file} -> ${finalFile}`);
  let brDecode = brotli.decompress(fileData);
  let unEncodedFile = encoder.decode(brDecode);
  let data = unEncodedFile;
  if (password != undefined) {
    data = decrypt(data, password);
  }
  fs.writeFile(finalFile, data, (err) => {
    if (err) throw err;
  });
  console.log("Done!");
}
