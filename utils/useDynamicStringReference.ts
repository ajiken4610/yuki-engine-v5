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
    let loadFileName = fileName;
    let refParent: DynamicStringResource | undefined = undefined;
    if (fileName in memo) {
      refParent = memo[fileName]!;
    } else {
      if (fileName.match(/^.*\.json$/g)) {
        // jsonファイルの場合
        const tsFileNames = (await $fetch(fileName)) as string[];
        for (const tsFileName of tsFileNames) {
          // ファイル名をパースしつつ、整合性をチェック
          const splitedTsFileName = tsFileName.split(/_|\./);
          splitedTsFileName.shift();
          splitedTsFileName.pop();
          let flag = true;
          for (const keyValueFileName of splitedTsFileName) {
            const keyValue = keyValueFileName.split("-");
            const key = keyValue[0] || "";
            const value = keyValue[1] || "";
            if (globalState[key] !== value) {
              flag = false;
              break;
            }
          }
          if (flag) {
            loadFileName = tsFileName;
            break;
          }
        }
        if (loadFileName === fileName) {
          return "ERR_DYN_STR_NOT_FND: " + fileName;
        }
      }

      refParent = (await import(/* @vite-ignore */ loadFileName))
        .default as DynamicStringResource;
      memo[fileName] = refParent;
    }
    ret = refParent.get(refName, state);
  } catch (e) {
    console.error(e);
  }
  return ret;
};
