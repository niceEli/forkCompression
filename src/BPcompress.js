import { muint8 } from "gomooe";
import { decrypt } from "node-encryption";

import gradule from "gradule";

const cPr = (x) => gradule.preset.instagram.print(x.toString());

/**
 * @param {string} file
 * @param {muint8.MUint8} encoder
 * @param {*} fileData
 * @param {string} password
 *
 * @param {boolean} replaceFile
 */
export default function BPcompress(file, encoder, fileData, password, replaceFile) {
  
}