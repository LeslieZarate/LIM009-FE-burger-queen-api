const express = require('express');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');
const db = require('./services/connection');
const cors = require('cors');

const { dbUrl, port, secret } = config;
const app = express();

// TODO: Conección a la BD en mogodb

db(dbUrl)
  .then(() => {
    app.set('config', config);
    app.set('pkg', pkg);

    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(authMiddleware(secret));
    // Registrar rutas
    routes(app, (err) => {
      if (err) {
        throw err;
      }
      app.use(errorHandler);
      app.listen(port, () => {
        console.info(`App listening on port ${port}`);
      });
    });
  });
