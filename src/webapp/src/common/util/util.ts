export function getIdFromSelectList(text: string, list: any[]) {
  let defaultId = text;
  if (defaultId.length == 0) {
    defaultId = list[0].id;
  }
  return defaultId;
}
