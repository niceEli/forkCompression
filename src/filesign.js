import enc from "./encodings.js";

class FileSignFlags {
  /** Has password?
   * @SET new this
   * @type {boolean}
   */
  password = false;

  /** Has basic Compression?
   * @SET new this
   * @type {boolean}
   */
  base = false;

  /** Has Bullpress Compression?
   * @SET new this
   * @type {boolean}
   */
  bullpress = false;

  /** Bundle flags for validation
   * @returns {{ hexVal: string, out: boolean[], val: boolean | Error }}
   */
  bundle(log = false) {
    return enc.signWithValidation(
      log,
      // This order is important
      this.password,
      this.base,
      this.bullpress,
    );
  }

  getArr() {
    return [this.password, this.base, this.bullpress];
  }

  /** Unpack and decode flags from hex string
   * @param {string} flagHex - Hex string containing encoded flags
   * @returns {boolean[]} - Decoded flags
   */
  unpack(flagHex, length) {
    return enc.unsignHexCharSig(flagHex, length);
  }

  constructor(password, compression) {
    this.password = password;
    this.base = !!compression;
    this.bullpress = !compression;
  }
}

const delim = "<|:";
function signToText(txt, password, compression) {
  let flags = new FileSignFlags(password, compression);
  let { hexVal, out, val } = flags.bundle();
  if (val instanceof Error) return val;
  return `${txt}${delim}${hexVal}`;
}

function unsignText(txt = "") {
  let rind = txt.lastIndexOf(delim);
  if (rind === -1) return { text: txt, flags: [] };

  let hexVal = txt.slice(rind + delim.length);
  let text = txt.slice(0, rind);
  let fsf = new FileSignFlags();
  
  /** @type {ReturnType<typeof fsf.getArr()> | undefined} */
  let flags;
  if (!!hexVal) flags = fsf.unpack(hexVal, fsf.getArr().length);
  
  return { text, flags };
}

export default {
  FileSignFlags,
  signToText,
  unsignText,
};
