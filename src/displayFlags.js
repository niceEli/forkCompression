export function displayFlags(cPr, ...flags) {
  for (var i = 0, flagStr = ""; i < flags.length; i++)
    flagStr += `${flags[i] ? "⦿" : "◦"} ${i} `;
  cPr(flagStr.trim());
}
