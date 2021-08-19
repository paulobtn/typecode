/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`CREATE TABLE source(
    id SERIAL PRIMARY KEY,
    language VARCHAR(10),
    project VARCHAR(20),
    uri VARCHAR(200),
    src VARCHAR
  )`);
};

exports.down = pgm => {
  pgm.sql(`DROP TABLE source`);
};
