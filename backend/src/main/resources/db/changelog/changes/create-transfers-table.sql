--liquibase formatted sql
--changeset <nikitos>:<create-transfers-table>

CREATE TABLE IF NOT EXISTS transfers
(
    id BIGINT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    player_id BIGINT NOT NULL,
    selling_team_id BIGINT NOT NULL,
    buying_team_id BIGINT NOT NULL,
    transfer_fee DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_transfer_player FOREIGN KEY (player_id) REFERENCES players(id),
    CONSTRAINT fk_transfer_selling_team FOREIGN KEY (selling_team_id) REFERENCES teams(id),
    CONSTRAINT fk_transfer_buying_team FOREIGN KEY (buying_team_id) REFERENCES teams(id)
);

--DROP TABLE transfers;