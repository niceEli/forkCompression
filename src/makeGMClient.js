import { findInArgs } from "./findInArgs.js";

import { bullpress } from "gomooe";
const { GoMooE1, GoMooE2 } = bullpress;

function getGMversion(gmChoice) {
  /** @type {typeof GoMooE1 | typeof GoMooE2} */
  let gmVersion;
  if (gmChoice[0]) gmVersion = GoMooE1;
  else if (gmChoice[1]) gmVersion = GoMooE2;
  else gmVersion = GoMooE1;
  return gmVersion;
}

export function makeGMClient() {
  try {
    let gmChoice = [
      findInArgs((x) => x === "-gm1" || x === "--gomooe1"),
      findInArgs((x) => x === "-gm2" || x === "--gomooe2"),
    ];
  
    return getGMversion(gmChoice);
  } catch (err) {
    // This means we're probably running in a browser
    return GoMooE1;
  }
}