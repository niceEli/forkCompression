import { verify } from "./verify.js";
import { cPr } from "./compress.js";

import { muint8 } from "gomooe";
const { UInt8E } = muint8;

export function logVerification(encodedStr, encodedFile) {
  let decodedLayer = UInt8E.encodeUint8(encodedStr);
  let verifyResults = [verify(decodedLayer, encodedFile)];

  cPr(`>  Verified: ${verifyResults.join(" | ")}`);
}
