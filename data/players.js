const mongoCollections = require("../config/mongoCollections");
const fantasyData = mongoCollections.fantasy_data;
const { ObjectId } = require("mongodb");

module.exports = {
  async createPlayer(firstName, lastName, debutYear, headshotPicture, position, profilePicture, teamId, playerRanking) {
    const fantasyCollection = await fantasyData();

    let newPlayer = {
      firstName: firstName,
      lastName: lastName,
      debutYear: debutYear,
      headshotPicture: headshotPicture,
      position: position,
      profilePicture: profilePicture,
      teamId: teamId,
      playerRanking: playerRanking,
    };

    const insertInfo = await fantasyCollection.insertOne(newPlayer);

    return newPlayer;
  },

  async getAll() {
    const fantasyCollection = await fantasyData();
    const userList = await fantasyCollection.find({}).toArray();

    return userList;
  },

  async getAllUsersIdAndName() {
    const fantasyCollection = await fantasyData();
    const userList = await fantasyCollection
      .find({}, { projection: { firstName: 1 } })
      .toArray();
    return userList;
  },
};
