const app = require('./src/app.js');
const pool = require('./src/pool');

const pgCredentials = require('./config/pg-credentials');

const PORT = process.env.PORT || 3001;

pool
  .connect(pgCredentials)
  .then(() => {
    app().listen(PORT, () => {
      console.log('Listening on port', PORT);
    });
  })
  .catch((err) => console.error(err));
