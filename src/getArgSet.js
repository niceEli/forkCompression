export const getArgSet = (x) => {
    var pos = 0, key = "";
    while (key !== x) {
        key = process.argv[pos];
        pos++;
        if (key === undefined) return;
    }
    return process.argv[pos];
};
