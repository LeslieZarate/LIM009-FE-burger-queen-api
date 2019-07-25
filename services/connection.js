const { MongoClient } = require('mongodb');
const { dbUrl } = require('../config');

let db = null;
module.exports = async () => {
  if (!db) {
    const client = new MongoClient(dbUrl, { useNewUrlParser: true });
    try {
      await client.connect();
      db = client.db();
      console.info('base de datos conectada');
      return db;
    } catch (err) {
      console.info(err.stack);
    }
  }
  return db;
};

/* module.exports = () => {
  if (!db) {
    const MonClient = MongoClient(dbUrl, { useNewUrlParser: true });
    return MonClient.connect().then((client) => {
      db = client.db();
      console.info('Connect to DataBase');
      return db;
    });
  }
  return Promise.resolve(db);
};

*/
/* module.exports = async (dbUrl) => {
  const client = new MongoClient(dbUrl, { useNewUrlParser: true });
  try {
    await client.connect();
    const db = client.db();
    console.info('base de datos conectada');
    return db;
  } catch (err) {
    console.info(err.stack);
  }
  client.close();
  console.info('connection close');
}; */
