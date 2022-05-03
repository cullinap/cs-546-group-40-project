const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.user_data;
const bcrypt = require("bcrypt");
const saltRounds = 16;
var validator = require("email-validator");

async function createUser(email, password) {
  if (!email) {
    throw "Username is a required field";
  }
  if (!password) {
    throw "Password is a required field";
  }
  if (typeof email != "string") {
    throw "Username must be a string";
  }
  if (typeof password != "string") {
    throw "Password must be a string";
  }
  email = email.trim().toLowerCase();
  if (!validator.validate(email)) {
    throw "Email is not valid";
  }
  password = password.trim().toLowerCase();
  if (password.length < 6) {
    throw "Password should be more than 6 characters";
  }
  const usersCollection = await users();
  const user = await usersCollection.findOne({ email: email });
  if (user) {
    throw "User already present in system";
  }
  const newUserInfo = {
    email: email,
    password: await bcrypt.hash(password, saltRounds),
    firstName: "",
    lastName: "",
    username: email.split("@")[0], //make this the prefix of email before the @
    teams: [],
    profilePicture: "",
    posts: [],
  };
  const insertUser = await usersCollection.insertOne(newUserInfo);
  if (!insertUser.acknowledged || !insertUser.insertedId) {
    throw "Could not add user to db";
  }
  return { userInserted: true };
}

async function checkUser(email, password) {
  if (!email) {
    throw "Username is a required field";
  }
  if (!password) {
    throw "Password is a required field";
  }
  if (typeof email != "string") {
    throw "Username must be a string";
  }
  if (typeof password != "string") {
    throw "Password must be a string";
  }
  email = email.trim().toLowerCase();
  if (!validator.validate(email)) {
    throw "Email is not valid";
  }
  password = password.trim().toLowerCase();
  if (password.length < 6) {
    throw "Password should be more than 6 characters";
  }
  const usersCollection = await users();
  const currUser = await usersCollection.findOne({ email: email });
  if (!currUser) {
    throw "Either the username or password is invalid";
  }
  const cmp = await bcrypt.compare(password, currUser.password);
  if (!cmp) {
    throw "Either the username or password is invalid";
  }
  return { authenticated: true };
}
async function getAll() {
  const userCollection = await users();
  const userList = await userCollection.find({}).toArray();
  return userList;
}
async function getAllUsersIdAndName() {
  const userCollection = await users();
  const userList = await userCollection
    .find({}, { projection: { firstName: 1 } })
    .toArray();
  return userList;
}

module.exports = { getAll, getAllUsersIdAndName, checkUser, createUser };
