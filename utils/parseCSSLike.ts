export default (src: string) => {
  const ret: { [key: string]: (number | string)[] }[] = [];
  for (const rowString of src.split(",")) {
    if (!rowString) {
      continue;
    }
    const row: { [key: string]: (number | string)[] } = {};
    ret.push(row);
    for (const colString of rowString.split(";")) {
      if (!colString) {
        continue;
      }
      const keyVal = colString.split(":");
      const key = keyVal[0]!.trim();
      const val = (keyVal[1] || "").trim();
      const colSplited = val.split(" ");
      row[key] = [];
      for (var i = 0; i < colSplited.length; i++) {
        const trimed = colSplited[i]!.trim();
        const parsedFloat = parseFloat(trimed);
        if (!isNaN(parsedFloat)) {
          row[key]!.push(parsedFloat);
        } else if (trimed) {
          row[key]!.push(trimed);
        }
      }
    }
  }
  return ret;
};
