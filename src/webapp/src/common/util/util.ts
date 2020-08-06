export function getIdFromSelectList(text: string, list: any[]) {
  let defaultId = text;
  if (!defaultId || defaultId.length == 0) {
    defaultId = list[0].id;
  }
  return defaultId;
}

export const DefaultUserId = 1;
export const DefaultUserTeamId = 5;

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
