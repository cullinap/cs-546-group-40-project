const dbConnection = require("./mongoConnection");

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.connectToDb();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

module.exports = {
    player_data: getCollectionFn("player_data"),
    user_data: getCollectionFn("user_data"),
    discussion_data: getCollectionFn('discussion_data'),
    user_team_data: getCollectionFn('user_team_data')
}