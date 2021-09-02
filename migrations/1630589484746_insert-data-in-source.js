/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`INSERT INTO source (language, project, uri, src) VALUES
    ('c', 'git', 'https://github.com/git/git/blob/master/archive.c', 'void init_archivers(void)
{
	init_tar_archiver();
	init_zip_archiver();
}' ), 
    ('c', 'git', 'https://github.com/git/git/blob/master/archive.c', 'struct directory {
	struct directory *up;
	struct object_id oid;
	int baselen, len;
	unsigned mode;
	char path[FLEX_ARRAY];
};'),
   ('javascript', 'react project', 'https://example.com', 'import React from "react";
import ReactDOM from "react-dom";')
  `)

};

exports.down = pgm => { 
  pgm.sql(`TRUNCATE source`);
};
