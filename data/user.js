const mongoCollections = require("../config/mongoCollections");
const fantasyData = mongoCollections.fantasy_data;
const { ObjectId } = require("mongodb");

module.exports = {
  async createUser(firstName, lastName, email, password, profilePicture) {
    const fantasyCollection = await fantasyData();

    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      teams: [],
      profilePicture: profilePicture,
      posts: [],
    };

    const insertInfo = await fantasyCollection.insertOne(newUser);

    return newUser;
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
