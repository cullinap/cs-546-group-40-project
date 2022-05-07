const mongoCollections = require("../config/mongoCollections");
const userTeamData = mongoCollections.user_team_data;
const { ObjectId } = require("mongodb");

module.exports = {
  async createTeam(ownerId, name, players) {
    const userTeamCollection = await userTeamData();

    let userTeam = {
        ownerId: ownerId,
        name: name,
        players: players,
    };

    const insertInfo = await userTeamCollection.insertOne(userTeam);

    return userTeam;
  },

  async getAll() {
    const userTeamCollection = await userTeamData();
    const userList = await userTeamCollection.find({}).toArray();

    return userList;
  },

  async getAllUsersIdAndName() {
    const userTeamCollection = await userTeamData();
    const userList = await userTeamCollection
      .find({}, { projection: { firstName: 1 } })
      .toArray();
    return userList;
  },
};