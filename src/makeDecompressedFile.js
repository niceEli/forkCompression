import { makeCompressedFile } from "./makeCompressedFile.js";
import { removeLastExt } from "./removeLastExt.js";

export function makeDecompressedFile(finalFile, replaceFile, fileData) {
  let { filename, ext } = removeLastExt(finalFile);
  makeCompressedFile(filename, replaceFile, fileData, ext);
}
