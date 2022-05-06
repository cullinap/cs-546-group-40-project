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
  player_data: getCollectionFn("players"),
  user_data: getCollectionFn("users"),
  discussion_data: getCollectionFn("discussions"),
  user_team_data: getCollectionFn("userTeams"),
};
