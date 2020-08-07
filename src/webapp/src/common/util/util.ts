export function getIdFromSelectList(text: string, list: any[]) {
  let defaultId = text;
  if (!defaultId || defaultId.length == 0) {
    defaultId = list[0].id;
  }
  return defaultId;
}
// 83 84   1-5
export const DefaultUserId = 83;
export const DefaultUserTeamId = 84;

export function returnUniqueArrayElement(arrayList: any[]) {
  const result = [];
  const map = new Map();
  for (const item of arrayList) {
    if (!map.has(item.id)) {
      map.set(item.id, true);
      result.push(item);
    }
  }
  return result;
}

export function returnMapFromList(arrayList: any[]) {
  const map = new Map();
  for (const item of arrayList) {
    if (!map.has(item.id)) {
      map.set(item.id, true);
    }
  }
  return map;
}

export function findCountDifferenceInList(
  arrayList1: any[],
  arrayList2: any[]
) {
  const map = new Map();
  for (const item of arrayList1) {
    map.set(item.id, true);
  }
  let difference = 0;
  for (const item of arrayList2) {
    if (!map.has(item.id)) {
      difference = difference + 1;
    }
  }
  return difference;
}
