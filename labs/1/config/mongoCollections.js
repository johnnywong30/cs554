const dbConnection = require('./mongoConnection');

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  let col;

  return async () => {
    if (!col) {
      const db = await dbConnection.connectToDb();
      col = await db.collection(collection);
    }

    return col;
  };
};

/* Now, you can list your collections here: */
module.exports = {
  sweets: getCollectionFn('sweets'),
  users: getCollectionFn('users'),
};
