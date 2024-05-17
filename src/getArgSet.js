export const getArgSet = (x) => {
  var pos = 0,
    key = "";
  while (key !== x) if ((key = process.argv[(pos += 1)] === undefined)) return;
  return process.argv[pos];
};
