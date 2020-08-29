import {Get, Post} from 'API';

export function lockTournament(id: number) {
  return Post('/fantasy/tournament/lockTournament', {
    data: {id: id},
  });
}

export function unLockTournament(id: number) {
  return Post('/fantasy/tournament/unlockTournament', {
    data: {id: id},
  });
}

export function statrCompleteMatch(matchId: number, action: string) {
  return Post('/admin/matchprocess/' + action + '/match', {
    data: {matchId: matchId},
  });
}

export function initUserMatchForTournament(matchId: number, type: string) {
  return Post('/admin/matchprocess/init/' + type, {
    data: {matchId: matchId},
  });
}

export function initiateMatchSquadFromCricAPI(matchId: number) {
  return Get('/process/criciapi/match/initiate/squad/' + matchId);
}

export function updateMatchPlayerScoreFromCricAPI(matchId: number) {
  return Get('/process/criciapi/match/update/score/' + matchId);
}

export function processPointByMatchId(matchId: number) {
  return Get('/process/point/bymatch/' + matchId);
}

export function processRanking(tournamentId: number) {
  return Get('/process/point/league/ranking/tournament/' + tournamentId);
}

export function addNotice(notice: string) {
  return Post('/fantasy/notice/add', {
    data: {name: notice},
  });
}

export function fetchActiveNotice() {
  return Get('/fantasy/notice/list/active/');
}

export function removeNotice(noticeId: number) {
  return Post('/fantasy/notice/disable', {
    data: {id: noticeId},
  });
}
