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
    const {rows} = await pool.query('SELECT * FROM source WHERE id = $1 ', [id]) 

    return toCamelCase(rows)[0];
  }
  
  static async insert(){

  }

  static async update(){

  }

  static async delete(){

  }
}

module.exports = SourceRepo;
