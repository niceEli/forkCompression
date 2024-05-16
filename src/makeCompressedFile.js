import fs from "node:fs";

export function makeCompressedFile(finalFile, replaceFile, data, ext = "fc") {
  const makeName = (file) => `${file}.${ext}`;
  let lastName = makeName(finalFile);

  // Make duplicates
  let dupeId = 0;
  if (!replaceFile)
    while (fs.existsSync(lastName))
      lastName = makeName(`${finalFile} (${(dupeId += 1)})`);

  fs.writeFile(lastName, data, (err) => {
    if (err) throw err;
  });
}
