import { type DynamicStringResource } from "~/interfaces/DynamicStringResource";

const memo: { [key: string]: DynamicStringResource } = {};

export default async (ref: string, state: { [key: string]: any }) => {
  let ret = "ERR_DYN_STR: " + ref;
  try {
    const splitedRef = ref.split("@");
    const refName = splitedRef[0]!;
    const fileName = splitedRef[1]!;
    let refParent: DynamicStringResource;
    if (fileName in memo) {
      refParent = memo[fileName]!;
    } else {
      refParent = (await import(fileName)) as DynamicStringResource;
    }
    ret = refParent.get(refName, state);
  } catch (e) {
    console.error(e);
  }
  return ret;
};
