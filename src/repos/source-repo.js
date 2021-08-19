const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

class SourceRepo {
  

  static async find(){
    const {rows} = await pool.query('SELECT * FROM source;');
    return toCamelCase(rows);
  }

  static async findById(){

  }
  
  static async insert(){

  }

  static async update(){

  }

  static async delete(){

  }
}

module.exports = SourceRepo;
