export function verify(s1 = "", s2 = "") {
  let res = true;
  for (let i = 0; i < s1.length; i++) if (s1[i] !== s2[i]) res = false;
  return res;
}
