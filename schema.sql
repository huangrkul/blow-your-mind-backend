DROP TABLE bym_rank;
CREATE TABLE IF NOT EXISTS bym_rank(
  id SERIAL PRIMARY KEY,
  player_name VARCHAR(255),
  difficulty VARCHAR(255),
  time_left INTEGER,
  chances_left INTEGER,
  hints_left INTEGER
);


SELECT * FROM bym_rank;