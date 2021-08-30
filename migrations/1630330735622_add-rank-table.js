exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`CREATE TABLE rank(
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    wpm INTEGER,
    accuracy INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  )`);
};

exports.down = pgm => {
  pgm.sql(`DROP TABLE rank`);
};
