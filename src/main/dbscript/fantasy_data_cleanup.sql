-- Remove user from league
DELETE FROM sattaIPL21.league_user_team WHERE league_id > 0;

-- Update League User Team details
UPDATE sattaIPL21.user_team
SET total_transfer = 90, total_score = 0,
	used_transfer = 0, captain_player_id = NULL,
	totalbalance = 100, creditbalance = 100,
	remained_transfer = 90 WHERE id > 1;
-- Clearing User Teams for each user
UPDATE sattaIPL21.user_team SET user_id = 378 WHERE id > 1;

-- Update league, make empty team count
UPDATE sattaIPL21.league SET total_user_count = 0 WHERE id > 1;

-- Delete all old matched of 20 IPL
UPDATE sattaIPL21.match_game set is_deleted = 1 where id > 1;

-- Update Tournament name
UPDATE sattaIPL21.tournament set name = 'IPL-21' where id > 1;

-- Delete all current Player
UPDATE sattaIPL21.player set is_deleted = 1 where id > 1;

-- Updating Punjab Kings Name
UPDATE `sattaIPL21`.`team` SET `name` = 'Punjab Kings' WHERE (`id` = '10');

-- for updating anything related to foreign key
-- SET FOREIGN_KEY_CHECKS = 0/1;
-- delete  from sattaIPL21.league_user_team_score_per_match where id > 0;
-- delete  from sattaIPL21.match_game where id > 0;
-- DELETE  FROM sattaIPL21.match_player_score where id > 0;
-- DELETE FROM sattaIPL21.match_result where id > 0;
-- DELETE FROM sattaIPL21.player where id > 0;
-- DELETE  FROM sattaIPL21.player_user_team where player_id > 0;
-- DELETE FROM sattaIPL21.user_team where id > 0;