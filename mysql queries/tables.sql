CREATE DATABASE football_market;
USE football_market;

CREATE TABLE leagues(
					league_id int primary key auto_increment,
                    league_name varchar(50),
                    country varchar(50)); 

                    
CREATE TABLE clubs(
					club_id int primary key auto_increment,
                    club_name varchar(20),
                    league_id int,
                    founded_year int,
                    colors varchar(20),
                    foreign key (league_id) references leagues(league_id)
					);
CREATE TABLE players( 
					  player_id int primary key auto_increment,
                      player_name varchar(50),
                      date_of_birth date,
                      club_id int,
                      nationality varchar(50),
                      position varchar(50) CHECK(position IN ('cf','mf','cb','gk')),
                      foreign key (club_id) references clubs(club_id));
                      
                      
CREATE TABLE finances(
					  finance_id int primary key auto_increment,
                      club_id int,
                      finance_year int,
                      revenue decimal(12,2),
                      sales decimal(12,2),
                      expenses decimal(12,2),
                      net_spent decimal(12,2) AS (revenue-expenses),
                      foreign key (club_id) references clubs(club_id));

CREATE TABLE contracts(
						contract_id int primary key auto_increment,
                        player_id int, 
                        club_id int,
                        start_date date,
                        end_date date,
                        salary double(12,2),
                        foreign key (club_id) references clubs(club_id),
                        foreign key (player_id) references players(player_id));
                        
CREATE TABLE transfers(
						transfer_id int primary key auto_increment,
                        player_id int ,
                        from_club_id int, 
                        to_club_id int,
                        transfer_fee double(12,2),
                        foreign key (player_id) references players(player_id),
                        foreign key (from_club_id) references clubs(club_id),
                        foreign key (to_club_id) references clubs(club_id));

desc 

