import {isListEmpty} from 'common/util';
import {isUserLogin} from '../../../../API';

export function getMapWithPlayerScore(arrayList: any[]) {
  const map = new Map();
  if (isListEmpty(arrayList)) return map;
  for (const item of arrayList) {
    if (!map.has(item.id)) {
      map.set(item.playerId, item.pointscore);
    }
  }
  return map;
}

export function getLiveUserPoint(
  userPlayerList: any[],
  matchPlayerList: any[],
  captainId: any
) {
  const userLogin = isUserLogin();
  if (!userLogin) return 0;
  const matchplayerScore = getMapWithPlayerScore(matchPlayerList);
  let score = 0;
  userPlayerList &&
    userPlayerList.forEach(player => {
      const playerScore = matchplayerScore.get(player.id);
      if (playerScore) {
        score = score + playerScore;
        if (player.id == captainId) {
          score = score + playerScore;
        }
      }
    });
  return score;
}

export function getMapWithUserList(arrayList: any[]) {
  const map = new Map();
  if (isListEmpty(arrayList)) return map;
  for (const item of arrayList) {
    if (!map.has(item.id)) {
      map.set(item.id, item);
    }
  }
  return map;
}

export function addUserPlayerInPlayerList(
  userPlayerList: any[],
  matchPlayerList: any[],
  captainId: any
) {
  const userLogin = isUserLogin();
  if (!userLogin) return matchPlayerList;
  const playerMap = getMapWithUserList(userPlayerList);
  const newMatchPlayerList: any[] = [];
  matchPlayerList &&
    matchPlayerList.forEach(player => {
      const userPlayer = playerMap.get(player.playerId);
      if (userPlayer && userPlayer.id == player.playerId) {
        player.owned = true;
        if (player.playerId == captainId) {
          player.captain = true;
        }
      }
      newMatchPlayerList.push(player);
    });
  return newMatchPlayerList;
}
