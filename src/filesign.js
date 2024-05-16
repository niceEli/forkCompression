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
  bullpress = false; // This is a maybe

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

  /** Unpack and decode flags from hex string
   * @param {string} flagHex - Hex string containing encoded flags
   * @returns {boolean[]} - Decoded flags
   */
  unpack(flagHex) {
    return enc.unsignHexCharSig(flagHex);
  }
}

void (function Test() {
  let fsf = new FileSignFlags();
  fsf.password = true;
  fsf.base = true;
  fsf.bullpress = true;

  console.log(fsf.bundle());
})();

export default {
  FileSignFlags,
};
