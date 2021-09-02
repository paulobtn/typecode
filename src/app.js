const express = require('express');
const sourceRouter = require("./routes/source");

module.exports = () => {
  const app = express();
  app.use(express.json());
  app.use(sourceRouter);

  if(process.env.NODE_ENV === 'production'){
      //express will serve up production assets like main.js e main.css
      app.use(express.static('client/build'));

      // express sends index.html if it doesn't find the route
      const path = require('path');   
      app.get('*', (req,res) => {
          res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
      });
  }

  return app;
}
