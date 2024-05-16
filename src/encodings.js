function toS2Hex(num, border = 2) {
  let hexStr = "";
  while (num > 0) {
    let remain = num % 16;
    let part =
      remain < 10 ? remain.toString() : String.fromCharCode(remain + 55);
    hexStr = part + hexStr;
    num = Math.floor(num / 16);
  }
  while (hexStr.length % 2 == 1) hexStr = "0" + hexStr;
  return hexStr;
}

function fromS2Hex(hexStr) {
  let num = 0;
  for (let i = 0; i < hexStr.length; i++) {
    const digit = hexStr[i].toUpperCase();
    const value = digit >= "A" ? digit.charCodeAt(0) - 55 : parseInt(digit, 10);
    num += value * 16 ** (hexStr.length - i - 1);
  }
  return num;
}

function encodeBinarySequence(sequence) {
  return sequence.reduce((acc, bit, index) => acc | (bit << index), 0);
}

function decodeBinarySequence(number, length, sequence = []) {
  for (let i = 0; i < length * 2; i++) sequence.push((number >> i) & 1);
  return sequence;
}

function validate(inp, out, logging = false) {
  let prfx = "[FCv]: ";
  if (inp.length != out.length) throw new Error(prfx + " Length mismatch");
  for (let i = 0; i < inp.length; i++)
    if (inp[i] != out[i]) throw new Error(prfx + " Mismatch at index " + i);
    else logging && console.log(`${prfx} Validated at index ${i}`);
  return true;
}

function hexCharSig(...flags) {
  // Encode to binary
  let flagsArr = flags.map((x) => (x ? 1 : 0));
  let encoded = encodeBinarySequence(flagsArr);
  // Encode to hex
  let hexVal = toS2Hex(encoded, Math.floor(flagsArr.length / 4));
  return hexVal;
}

function unsignHexCharSig(hexStr, length) {
  // Decode to binary
  let encoded = fromS2Hex(hexStr);
  let flagsArr = decodeBinarySequence(encoded, length / 2);
  return flagsArr.map((x) => x === 1);
}

function signWithValidation(logging = false, ...flags) {
  let hexVal = hexCharSig(...flags);
  let out = unsignHexCharSig(hexVal, flags.length);
  let val = false;

  try {
    val = validate(flags, out, !!logging);
  } catch (e) {
    val = e;
    console;
  }

  return {
    flags,
    hexVal,
    out,
    val,
  };
}

function encodeString(str) {
  let encoded = str.split("").map((x) => x.charCodeAt(0));
  // Charcodes are supposed to be small, idc  lets do it twice !
  return toS2Hex(encoded.map((code) => toS2Hex(code)).join(""));
}

function decodeString(hexStr, length) {
  // We decide to do it twice !
  let decoded = fromS2Hex(hexStr).toString();
  let hexPairs = decoded.match(/.{1,2}/g);
  let charCodes = hexPairs.map((hex) => fromS2Hex(hex));
  return String.fromCharCode(...charCodes);
}

export default {
  hexCharSig,
  unsignHexCharSig,
  signWithValidation,
  encodeString,
  decodeString,
};
