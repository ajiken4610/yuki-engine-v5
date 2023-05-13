import { type DynamicStringResource } from "~/interfaces/DynamicStringResource";

const memo: { [key: string]: DynamicStringResource } = {};

export default async (
  ref: string,
  state: { [key: string]: any },
  globalState: { [key: string]: string }
) => {
  let ret = "ERR_DYN_STR: " + ref;
  try {
    const splitedRef = ref.split("@");
    const refName = splitedRef[0]!;
    let fileName = splitedRef[1]!;
    let refParent: DynamicStringResource | undefined = undefined;
    if (fileName in memo) {
      refParent = memo[fileName]!;
    } else {
      if (fileName.matchAll(/^.*\.json$/g)) {
        // jsonファイルの場合
        const jsonFile = (await import(fileName)) as string[];
        const parsed: { [key: string]: string }[] = [];
        for (const fileName of jsonFile) {
          const elements = fileName.split("_");
          elements.shift();
          const child: { [key: string]: string } = {};
          parsed.push(child);
          for (const keyValue of elements) {
            const key0value1 = keyValue.split("-");
            child[key0value1[0]!] = key0value1[1]!;
          }
        }
        for (var i = 0; parsed.length; i++) {
          const currentFile = parsed[i]!;
          let flag = true;
          for (const key of Object.keys(currentFile)) {
            flag &&= globalState[key] === currentFile[key];
          }
          if (flag) {
            refParent = (await import(jsonFile[i]!)) as DynamicStringResource;
          }
        }
        if (!refParent) {
          return ret;
        }
      } else if (fileName.matchAll(/^.*\.ts$/g)) {
        // tsファイルの場合
        refParent = (await import(fileName)) as DynamicStringResource;
      } else {
        // ほかの場合
        return ret;
      }
    }
    ret = refParent.get(refName, state);
  } catch (e) {
    console.error(e);
  }
  return ret;
};
