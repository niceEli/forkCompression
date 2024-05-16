export const removeLastExt = (f = "") => {
  const lastIndex = f.lastIndexOf(".");
  return {
    filename: f.slice(0, lastIndex),
    ext: f.slice(lastIndex + 1),
  };
};
