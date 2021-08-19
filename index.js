const app = require('./src/app.js');
const pool = require('./src/pool');
const pgCredentials = require('./pg-credentials'); //use your own database

pool
  .connect(pgCredentials)
  .then(() => {
    app().listen(3001, () => {
      console.log('Listening on port 3001');
    });
  })
  .catch((err) => console.error(err));
