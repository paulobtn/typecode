const express = require('express');
const sourceRouter = require("./routes/source");

module.exports = () => {
  const app = express();
  app.use(express.json());
  app.use(sourceRouter);

  return app;
}
