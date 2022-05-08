const mongoCollections = require("../config/mongoCollections");
const userTeamData = mongoCollections.user_team_data;
const { ObjectId } = require("mongodb");
var xss = require("xss");
const userData = require("./user");

module.exports = {
  async createTeam(ownerId, name) {
    if (!ownerId) {
      throw "ownerId is a required field";
    }
    if (!name) {
      throw "name is a required field";
    }
    if (typeof ownerId != "string") {
      throw "ownerId is not a string";
    }
    if (typeof name != "string") {
      throw "name is not a string";
    }
    ownerId = ownerId.trim();
    name = xss(name.trim());
    if (!ObjectId.isValid(ownerId)) {
      throw "ownerId is not valid";
    }
    //check to see if user exists
    await userData.getUserData(ownerId);
    const userTeamCollection = await userTeamData();
    let userTeam = {
      _id: ObjectId(),
      ownerId: ownerId,
      name: name,
      players: [],
    };
    const insertInfo = await userTeamCollection.insertOne(userTeam);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw "Could not add team to db";
    }
    await userData.addTeam(ownerId, String(userTeam._id));
    return { teamInserted: true, teamId: userTeam._id };
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
