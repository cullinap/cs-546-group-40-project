const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.user_data;
const { ObjectId } = require("mongodb");

async function getAllUsersIdAndName() {
  const usersCollection = await users();
  const userList = await usersCollection
    .find({}, { projection: { username: 1 } })
    .toArray();
  return userList;
}

async function getUserIdByName(username) {
    if (!username) {
      throw "ownerId is a required field";
    }
    username = username.trim()
    if (typeof username != "string") {
      throw "username must be a string";
    }

    const usersCollection = await users();
    const user = await usersCollection.findOne({ username: username });

  if (!user) {
    throw "Could not find user with name of " + username;
  }

  return user._id;
}

async function getAll() {
  const userTeamCollection = await userTeamData();
  const userList = await userTeamCollection.find({}).toArray();

  return userList;
}

module.exports = {
  getAllUsersIdAndName,
  getUserIdByName,
};
