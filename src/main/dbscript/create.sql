create table hibernate_sequence (next_val bigint) engine=InnoDB
insert into hibernate_sequence values ( 1 )
insert into hibernate_sequence values ( 1 )
insert into hibernate_sequence values ( 1 )
insert into hibernate_sequence values ( 1 )
insert into hibernate_sequence values ( 1 )
insert into hibernate_sequence values ( 1 )
insert into hibernate_sequence values ( 1 )
insert into hibernate_sequence values ( 1 )
insert into hibernate_sequence values ( 1 )
insert into hibernate_sequence values ( 1 )
insert into hibernate_sequence values ( 1 )
create table league (id bigint not null, created_at date, league_code varchar(255), name varchar(255), status bit, updated_at date, created_by bigint not null, tournament_id bigint not null, updated_by bigint not null, primary key (id)) engine=InnoDB
create table league_userteam (league_id bigint not null, userteam_id bigint not null) engine=InnoDB
create table match_details (id bigint not null, description varchar(255), match_time date, player_of_match_id bigint not null, match_schedule_id bigint not null, team_winner_id bigint not null, primary key (id)) engine=InnoDB
create table match_player_score (id bigint not null, catches integer, pointscore integer, run_scored integer, wicket integer, match_id bigint not null, player_id bigint not null, primary key (id)) engine=InnoDB
create table match_schedule (id bigint not null, description varchar(255), match_time date, owner varchar(255), team_away_id bigint not null, team_host_id bigint not null, venue_id bigint not null, primary key (id)) engine=InnoDB
create table match_user_team_score (id bigint not null, current_match_point integer, total_point integer, match_id bigint not null, user_team_id bigint not null, primary key (id)) engine=InnoDB
create table player (id bigint not null, country varchar(255), name varchar(255), type integer, value float not null, primary key (id)) engine=InnoDB
create table team (id bigint not null, created_at datetime(6), updated_at datetime(6), country varchar(255), name varchar(255), owner varchar(255), tournament_id bigint not null, primary key (id)) engine=InnoDB
create table team_player (team_id bigint not null, player_id bigint not null) engine=InnoDB
create table tournament (id bigint not null, created_at datetime(6), updated_at datetime(6), country varchar(255), name varchar(255), sport_name varchar(255), status bit, primary key (id)) engine=InnoDB
create table user (id bigint not null, access_token varchar(255), email varchar(255), mobile_number varchar(255), name varchar(255), password varchar(255), refresh_token varchar(255), role varchar(255), primary key (id)) engine=InnoDB
create table user_team (id bigint not null, created_at date, creditbalance integer, current_used_transfer integer, name varchar(255), remained_transfer integer, status bit, total_transfer integer, total_score integer, updated_at date, used_transfer integer, captain_player_id bigint not null, league_id bigint not null, user_id bigint not null, primary key (id)) engine=InnoDB
create table userteam_player (userteam_id bigint not null, player_id bigint not null) engine=InnoDB
create table venue (id bigint not null, country varchar(255), city varchar(255), name varchar(255), primary key (id)) engine=InnoDB
alter table league add constraint FKmn1e8ekvma0pw8dsn7961ei6e foreign key (created_by) references user (id)
alter table league add constraint FK8aje1y4bwcfwjx6hpqmvvgsl0 foreign key (tournament_id) references tournament (id)
alter table league add constraint FK9nhriu69hvh2ocqub68uqphhb foreign key (updated_by) references user (id)
alter table league_userteam add constraint FKqvrdhd6si2oyk5cdhalcr9f1 foreign key (userteam_id) references user_team (id)
alter table league_userteam add constraint FKt2doykvmchyk3ucdns8i5g5y foreign key (league_id) references league (id)
alter table match_details add constraint FKh1lbg4045brwb6gb884fjc1cq foreign key (player_of_match_id) references player (id)
alter table match_details add constraint FKbr179vxg7psfiyqt1ufw7gqae foreign key (match_schedule_id) references match_schedule (id)
alter table match_details add constraint FKmhi9vaj0lb265pjqrmodgmt9s foreign key (team_winner_id) references team (id)
alter table match_player_score add constraint FKpsv901p1cniplhw6o59ao7vd1 foreign key (match_id) references match_details (id)
alter table match_player_score add constraint FKa1rpp7fi8wp271jr1oj23fwlj foreign key (player_id) references player (id)
alter table match_schedule add constraint FKjj8t86b3bol7xwxr86ebswe90 foreign key (team_away_id) references team (id)
alter table match_schedule add constraint FKg6ty8bhagxs9ini65tuukpmgl foreign key (team_host_id) references team (id)
alter table match_schedule add constraint FKshuo0x4bddwpjhvu95sod5d2a foreign key (venue_id) references venue (id)
alter table match_user_team_score add constraint FKce7yo256o1me3fupsoeh2b8op foreign key (match_id) references match_details (id)
alter table match_user_team_score add constraint FKt770t8ccpv3hpti77gola3jpg foreign key (user_team_id) references player (id)
alter table team add constraint FKpyo6uq99yep4x5hj1ulkwpvso foreign key (tournament_id) references tournament (id)
alter table team_player add constraint FKbpugg1ip2ym9ugk7of5ykojuh foreign key (player_id) references team (id)
alter table team_player add constraint FK8xbqy38sdkefx5k09e92qoduc foreign key (team_id) references player (id)
alter table user_team add constraint FKlbj22ys873i6mtdkgggj4t5ic foreign key (captain_player_id) references player (id)
alter table user_team add constraint FKbap0hmum5k3v9od1om2nbvdk4 foreign key (league_id) references league (id)
alter table user_team add constraint FKd6um0sk8hyytfq7oalt5a4nph foreign key (user_id) references user (id)
alter table userteam_player add constraint FKpqvta5u306tlr55iv1gmgw1bk foreign key (player_id) references player (id)
alter table userteam_player add constraint FK6h2wkcja1g3xhhq6a27g570i4 foreign key (userteam_id) references user_team (id)
