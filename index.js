const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');
const db = require('./services/connection');

// const { UserAPI, PersonalizationAPI } = require('./schema/userAPI');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const { dbUrl, port, secret } = config;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `http://localhost:${port}/graphql`,
    settings: {
      'editor.theme': 'light',
    },
  },
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  },
  // formatError: (err) => {
  //   console.log(err.originalError);
  // },
});
const app = express();
// TODO: Conección a la BD en mogodb

db(dbUrl)
  .then(() => {
    app.set('config', config);
    app.set('pkg', pkg);
    server.applyMiddleware({ app });
    app.use(cors());
    // parse application/x-www-form-urlencoded
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
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
