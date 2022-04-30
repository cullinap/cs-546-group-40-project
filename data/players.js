const mongoCollections = require("../config/mongoCollections");
const playerData = mongoCollections.player_data;
const { ObjectId } = require("mongodb");

module.exports = {
  async mapEspnIdToPlayer(espnid, firstName, lastName) {
    const playerCollection = await playerData();

    let player = {
      espnid: espnid,
      firstName: firstName,
      lastName: lastName
    }

    const insertInfo = await playerCollection.insertOne(player);
    return player;
  },

  async createPlayer(firstName, lastName, debutYear, headshotPicture, position, profilePicture, teamId, playerRanking) {
    const playerCollection = await playerData();
    const player_data = await playerNameIdMap()

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

    const insertInfo = await playerCollection.insertOne(newPlayer);

    return newPlayer;
  },

  async getAll() {
    const playerCollection = await playerData();
    const userList = await playerCollection.find({}).toArray();

    return userList;
  },

  async getAllUsersIdAndName() {
    const playerCollection = await playerData();
    const userList = await playerCollection
      .find({}, { projection: { firstName: 1 } })
      .toArray();
    return userList;
  },
};
