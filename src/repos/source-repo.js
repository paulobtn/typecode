const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class SourceRepo {
  
  //get all sources
  static async find(){
    const {rows} = await pool.query('SELECT * FROM source;');
    return toCamelCase(rows);
  }
  
  //get a particular source
  static async findById(id){
    const {rows} = await pool.query('SELECT * FROM source WHERE id = $1;', [id]) 

    return toCamelCase(rows)[0];
  }
  
  static async insert(language, project, uri, src){
    const {rows} = await pool.query(
      'INSERT INTO source (language, project, uri, src) VALUES ($1, $2, $3, $4) RETURNING *;',
      [language, project, uri, src]
    );

    return toCamelCase(rows)[0];
  }

  static async update(id, language, project, uri, src){

    const {
      rows,
    } = await pool.query(
      'UPDATE source SET language = $1, project = $2, uri = $3, src = $4 WHERE id = $5 RETURNING *;',
      [language, project, uri, src, id]
    );

    return toCamelCase(rows)[0];

  }

  static async delete(id){
    
    const {
      rows,
    } = await pool.query('DELETE FROM source WHERE id = $1 RETURNING *;', [id]);

    return toCamelCase(rows)[0];
  }


  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM source;');

    return parseInt(rows[0].count);
  }
}

module.exports = SourceRepo;
