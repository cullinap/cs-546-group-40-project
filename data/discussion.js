const mongoCollections = require("../config/mongoCollections");
const discussionData = mongoCollections.discussion_data;
const { ObjectId } = require("mongodb");

module.exports = {
  async createPlayer(ownderId, name, players) {
    const discussionCollection = await discussionData();

    let newPlayer = {
      ownderId: firstName,
      name: lastName,
      players: debutYear,
    };

    const insertInfo = await discussionCollection.insertOne(newPlayer);

    return newPlayer;
  },

  async getAll() {
    const discussionCollection = await discussionData();
    const userList = await discussionCollection.find({}).toArray();

    return userList;
  },

  async getAllUsersIdAndName() {
    const discussionCollection = await discussionData();
    const userList = await discussionCollection
      .find({}, { projection: { firstName: 1 } })
      .toArray();
    return userList;
  },
};