import {Get, Post} from 'API';

export function lockTournament(id: number, matchId: number) {
  return Post('/fantasy/tournament/lockTournament', {
    data: {id: id, matchId: matchId},
  });
}

export function unLockTournament(id: number, matchId: number) {
  return Post('/fantasy/tournament/unlockTournament', {
    data: {id: id, matchId: matchId},
  });
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
