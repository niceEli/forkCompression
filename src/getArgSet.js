export const getArgSet = (x) => {
  let i = process.argv.indexOf(x);
  return i !== -1 ? process.argv[i + 1] : undefined
};
