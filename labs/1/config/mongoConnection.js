const { MongoClient } = require('mongodb');
const settings = require('./settings.json');

const { mongoConfig } = settings;

let connection;
let db;

module.exports = {
  connectToDb: async () => {
    if (!connection) {
      connection = await MongoClient.connect(mongoConfig.serverUrl);
      db = await connection.db(mongoConfig.database);
    }

    return db;
  },
  closeConnection: () => {
    connection.close();
  },
};
