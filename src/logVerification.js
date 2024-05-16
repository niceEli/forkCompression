import gradule from "gradule";

import { verify } from "./verify.js";
const cPr = (x) => gradule.preset.retro.print(x.toString());

import { muint8 } from "gomooe";
const { UInt8E } = muint8;

export function logVerification(encodedStr, encodedFile) {
  let decodedLayer = UInt8E.encodeUint8(encodedStr);
  let verifyResults = [verify(decodedLayer, encodedFile)];

  cPr(`>  Verified: ${verifyResults.join(" | ")}`);
}
