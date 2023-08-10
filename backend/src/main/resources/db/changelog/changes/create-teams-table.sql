--liquibase formatted sql
--changeset <nikitos>:<create-teams-table>

CREATE TABLE IF NOT EXISTS teams
(
    id        bigint auto_increment primary key not null,
    name     varchar(255) not null,
    country     varchar(255) not null,
    city varchar(255) not null,
    budget decimal(12, 2)                    not null,
    commission INT NOT NULL,
    deleted tinyint(1) not null default 0
);
--DROP TABLE teams;
