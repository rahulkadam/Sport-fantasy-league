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
