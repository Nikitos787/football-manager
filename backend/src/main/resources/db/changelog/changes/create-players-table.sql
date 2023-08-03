--liquibase formatted sql
--changeset <nikitos>:<create-players-table>

    CREATE TABLE IF NOT EXISTS players (
        id bigint auto_increment primary key not null,
        first_name varchar(255) not null,
        second_name varchar(255) not null,
        city varchar(255) not null,
        country varchar(255) not null,
        date_of_beginning_career date not null,
        birth_date date not null,
        is_deleted tinyint(1) not null default 0,
        team_id BIGINT,
        status varchar(255) not null default 'UNEMPLOYED',
        position varchar(255) not null,
        CONSTRAINT fk_player_team FOREIGN KEY (team_id) REFERENCES teams(id)
    );

--DROP TABLE players;
