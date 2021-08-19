const app = require('./src/app.js');
const pool = require('./src/pool');

const pgCredentials = require('./pg-credentials');
// pgCredentials must be in the format
// module.exports = {
    // host: "localhost",
    // port: 5432,
    // database: "your db",
    // user: "your pg user",
    // password: "your pg password"
// }

pool
  .connect(pgCredentials)
  .then(() => {
    app().listen(3001, () => {
      console.log('Listening on port 3001');
    });
  })
  .catch((err) => console.error(err));
