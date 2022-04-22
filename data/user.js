const mongoCollections = require("../config/mongoCollections");
const userData = mongoCollections.user_data;
const { ObjectId } = require("mongodb");

module.exports = {
  async createUser(firstName, lastName, email, password, profilePicture) {
    const userCollection = await userData();

    let newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      teams: [],
      profilePicture: profilePicture,
      posts: [],
    };

    const insertInfo = await userCollection.insertOne(newUser);

    return newUser;
  },

  async getAll() {
    const userCollection = await userData();
    const userList = await userCollection.find({}).toArray();

    return userList;
  },

  async getAllUsersIdAndName() {
    const userCollection = await userData();
    const userList = await userCollection
      .find({}, { projection: { firstName: 1 } })
      .toArray();
    return userList;
  },
};
