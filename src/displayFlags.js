export function displayFlags(cPr, ...flags) {
  let flagStr = "";
  for (let i = 0; i < flags.length; i++)
    flagStr += `${flags[i] ? "⦿" : "◦"} ${i} `;
  cPr(flagStr.trim());
}
