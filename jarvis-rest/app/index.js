const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const logger = require('./logger');
const establishRoutes = require('./router');

module.exports = () => {
  // Establish express app
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  establishRoutes(app);
  app.use(logErrors);
      
  function logErrors(err, req, res, next) {
    logger.error(err.stack);
    next(err);
  }
    
  function startExpress() {
    app.listen(config.express.port);
    logger.info(`Listening on port ${config.express.port}`);
  }

  startExpress();
};
