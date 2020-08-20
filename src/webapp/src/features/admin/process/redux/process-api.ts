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

export function processPointByMatchId(matchId: number) {
  return Get('/fantasy/process/point/bymatch/' + matchId);
}

export function processRanking(tournamentId: number) {
  return Get('/fantasy/process/league/ranking/tournament/' + tournamentId);
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
