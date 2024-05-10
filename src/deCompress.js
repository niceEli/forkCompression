import fs, { fdatasync } from "node:fs";
import brotli from "brotli";
import { decrypt } from "node-encryption";
export default function deCompress(file, encoder, fileData, password) {
  let finalFile = file.slice(0, -3);
  console.log(`${file} -> ${finalFile}`);
  let data = fileData;
  if (password != undefined) {
    data = Buffer.from(decrypt(data.toString(), password));
  }
  let unEncodedFile = encoder.decode(data);
  fs.writeFile(finalFile, unEncodedFile, (err) => {
    if (err) throw err;
  });
  console.log("Done!");
}
