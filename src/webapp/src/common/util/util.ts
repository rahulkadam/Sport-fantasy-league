export function getIdFromSelectList(text: string, list: any[]) {
  let defaultId = text;
  if (!defaultId || defaultId.length == 0) {
    defaultId = list[0].id;
  }
  return defaultId;
}
// 83 84   1-5  108  127 128
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

export function getErrorMessage(error: any) {
  const errorResponse = error.response;
  if (errorResponse && errorResponse.data) {
    return errorResponse.data.error;
  }
  return 'Error occured while performing action, please check again';
}

export function isListEmpty(list: any) {
  return !list || list.length == 0;
}

export function getAutoPickTeam(list: any) {
  let autoUserTeam: any = [];
  let wkArr = 0;
  let alArr = 0;
  let batArr = 0;
  let bowlArr = 0;
  let total = 0;
  list.forEach((player: any) => {
    if (total == 11) {
      return;
    }
    if (!player.teamsNameList || player.teamsNameList.length == 0) {
    } else {
      if (player.type == 'WICKETKEEPER' && wkArr == 0) {
        autoUserTeam = autoUserTeam.concat(player);
        wkArr = 1;
        total = total + 1;
      }
      if (player.type == 'ALLROUNDER' && alArr < 2) {
        autoUserTeam = autoUserTeam.concat(player);
        alArr = alArr + 1;
        total = total + 1;
      }

      if (player.type == 'BATSMAN' && batArr < 4) {
        autoUserTeam = autoUserTeam.concat(player);
        batArr = batArr + 1;
        total = total + 1;
      }
      if (player.type == 'BOWLER' && bowlArr < 4) {
        autoUserTeam = autoUserTeam.concat(player);
        bowlArr = bowlArr + 1;
        total = total + 1;
      }
    }
  });

  return autoUserTeam;
}
