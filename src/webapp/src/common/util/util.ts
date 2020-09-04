import {Badge} from 'react-bootstrap';
import React from 'react';
import {GA_Exception} from '../config';

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
  if (!arrayList) return map;
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
    const errorMsg = errorResponse.data.error;
    GA_Exception(errorMsg);
    return errorMsg;
  }
  const err =
    'opps! something went wrong, please logout/login or refresh again';
  GA_Exception(err);
  return err;
}

export function isListEmpty(list: any) {
  return !list || list.length == 0;
}

export function isValueEmpty(value: string) {
  return !value || value.length == 0;
}

export function getAutoPickTeam(list: any) {
  let autoUserTeam: any = [];
  let wkArr = 0;
  let alArr = 0;
  let batArr = 0;
  let bowlArr = 0;
  let total = 0;
  const map = new Map();
  list.forEach((player: any) => {
    if (total == 11) {
      return;
    }
    const team = !isListEmpty(player.teamsNameList)
      ? player.teamsNameList[0]
      : '';
    const playerPerTeam = map.get(team) || 0;
    if (isValueEmpty(team) || playerPerTeam == 2) {
    } else {
      let isPLayerValid = false;
      if (player.type == 'WICKETKEEPER' && wkArr == 0) {
        wkArr = 1;
        isPLayerValid = true;
      }
      if (player.type == 'ALLROUNDER' && alArr < 2) {
        alArr = alArr + 1;
        isPLayerValid = true;
      }
      if (player.type == 'BATSMAN' && batArr < 4) {
        batArr = batArr + 1;
        isPLayerValid = true;
      }
      if (player.type == 'BOWLER' && bowlArr < 4) {
        bowlArr = bowlArr + 1;
        isPLayerValid = true;
      }
      if (isPLayerValid) {
        autoUserTeam = autoUserTeam.concat(player);
        total = total + 1;
        map.set(team, playerPerTeam + 1);
      }
    }
  });

  return autoUserTeam;
}

export function getTime(time: any) {
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Asia/Kolkata',
    hour12: true,
  };
  const dateTime = new Date(time);
  return dateTime.toLocaleDateString('en-Us', options);
}

export function wrapTextWithLength(value: string, length: number) {
  if (value.length > length) {
    const newValue = value.slice(0, length);
    return newValue + '..';
  }
  return value;
}

export function wrapText(value: string) {
  return wrapTextWithLength(value, 15);
}
