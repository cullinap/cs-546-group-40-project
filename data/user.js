const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.user_data;
const bcrypt = require("bcrypt");
const saltRounds = 16;
var validator = require("email-validator");
const { ObjectId } = require("mongodb");
var xss = require("xss");

async function createUser(email, password) {
  if (!email) {
    throw "Email is a required field";
  }
  if (!password) {
    throw "Password is a required field";
  }
  if (typeof email != "string") {
    throw "Email must be a string";
  }
  if (typeof password != "string") {
    throw "Password must be a string";
  }
  email = xss(email.trim().toLowerCase());
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
    throw "Email is a required field";
  }
  if (!password) {
    throw "Password is a required field";
  }
  if (typeof email != "string") {
    throw "Email must be a string";
  }
  if (typeof password != "string") {
    throw "Password must be a string";
  }
  email = xss(email.trim().toLowerCase());
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
  return currUser;
}

async function addPost(ownerId, postId) {
  if (!ownerId) {
    throw "ownerId is a required field";
  }
  if (!postId) {
    throw "postId is a required field";
  }
  if (typeof ownerId != "string") {
    throw "ownerId must be a string";
  }
  if (typeof postId != "string") {
    throw "postId must be a string";
  }
  ownerId = ownerId.trim();
  postId = postId.trim();
  if (!ObjectId.isValid(ownerId)) {
    throw "ownerId is not a valid id";
  }
  if (!ObjectId.isValid(postId)) {
    throw "postId is not a valid id";
  }
  const usersCollection = await users();
  const update = await usersCollection.updateOne(
    { _id: ObjectId(ownerId) },
    { $push: { posts: postId } }
  );
  return update.modifiedCount != 0;
}

async function updateUserPfp(ownerId, pfpUrl) {
  if (!ownerId) {
    throw "ownerId is a required field";
  }
  if (!pfpUrl) {
    throw "Profile picture URL is a required field";
  }
  if (typeof ownerId != "string") {
    throw "ownerId must be a string";
  }
  if (typeof pfpUrl != "string") {
    throw "Profile picture URL is a string";
  }
  ownerId = ownerId.trim();
  pfpUrl = pfpUrl.trim();
  if (!ObjectId.isValid(ownerId)) {
    throw "ownerId is not a valid id";
  }
  const userCollection = await users();
  const update = await userCollection.updateOne(
    { _id: ObjectId(ownerId) },
    { $set: { profilePicture: pfpUrl } }
  );
  return update.modifiedCount != 0;
}

async function updateUserName(ownerId, firstname, lastname) {
  if (!ownerId) {
    throw "ownerId is a required field";
  }
  if (!firstname) {
    throw "First name is a required field";
  }
  if (!lastname) {
    throw "Last name is a required field";
  }
  if (typeof ownerId != "string") {
    throw "ownerId must be a string";
  }
  if (typeof firstname != "string") {
    throw "First name is not a string";
  }
  if (typeof lastname != "string") {
    throw "Last name is not a string";
  }
  ownerId = ownerId.trim();
  firstname = xss(firstname.trim());
  lastname = xss(lastname.trim());
  if (!ObjectId.isValid(ownerId)) {
    throw "ownerId is not a valid id";
  }
  const userCollection = await users();
  const update = await userCollection.updateOne(
    { _id: ObjectId(ownerId) },
    { $set: { firstName: firstname, lastName: lastname } }
  );
  return update.modifiedCount != 0;
}

async function updateUserUsn(ownerId, username) {
  if (!ownerId) {
    throw "ownerId is a required field";
  }
  if (!username) {
    throw "Username is a required field";
  }
  if (typeof ownerId != "string") {
    throw "ownerId must be a string";
  }
  if (typeof username != "string") {
    throw "Username is not a string";
  }
  ownerId = ownerId.trim();
  username = xss(username.trim().toLowerCase());
  if (!ObjectId.isValid(ownerId)) {
    throw "ownerId is not a valid id";
  }
  const userCollection = await users();
  const user = await userCollection.findOne({ username: username });
  if (user) {
    throw "Username already present in system";
  }
  const update = await userCollection.updateOne(
    { _id: ObjectId(ownerId) },
    { $set: { username: username } }
  );
  return update.modifiedCount != 0;
}

async function updateUserEm(ownerId, newemail) {
  if (!ownerId) {
    throw "ownerId is a required field";
  }
  if (!newemail) {
    throw "newemail is a required field";
  }
  if (typeof ownerId != "string") {
    throw "ownerId must be a string";
  }
  if (typeof newemail != "string") {
    throw "newemail is not a string";
  }
  ownerId = ownerId.trim();
  newemail = xss(newemail.trim());
  if (!ObjectId.isValid(ownerId)) {
    throw "ownerId is not a valid id";
  }
  if (!validator.validate(newemail)) {
    throw "newemail is not valid";
  }
  const userCollection = await users();
  const user = await userCollection.findOne({ email: newemail });
  if (user) {
    throw "Email already present in system.";
  }
  const update = await userCollection.updateOne(
    { _id: ObjectId(ownerId) },
    { $set: { email: newemail } }
  );
  return update.modifiedCount != 0;
}

async function updateUserPwd(ownerId, password) {
  if (!ownerId) {
    throw "ownerId is a required field";
  }
  if (!password) {
    throw "password is a required field";
  }
  if (typeof ownerId != "string") {
    throw "ownerId must be a string";
  }
  if (typeof password != "string") {
    throw "password is not a string";
  }
  ownerId = ownerId.trim();
  password = password.trim();
  if (!ObjectId.isValid(ownerId)) {
    throw "ownerId is not a valid id";
  }
  const userCollection = await users();
  const update = await userCollection.updateOne(
    { _id: ObjectId(ownerId) },
    { $set: { password: await bcrypt.hash(password, saltRounds) } }
  );
  return update.modifiedCount != 0;
}
async function getAll() {
  const userCollection = await users();
  const userList = await userCollection.find({}).toArray();
  return userList;
}

async function getUser(ownerId) {
  if (!ownerId) {
    throw "ownerId is a required field";
  }
  if (typeof ownerId != "string") {
    throw "ownerId must be a string";
  }
  ownerId = ownerId.trim();
  if (!ObjectId.isValid(ownerId)) {
    throw "ownerId is not a valid id";
  }
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(ownerId) });
  if (!user) {
    throw "User not found";
  }
  return user;
}

async function getUserData(ownerId) {
  if (!ownerId) {
    throw "ownerId is a required field";
  }
  if (typeof ownerId != "string") {
    throw "ownerId must be a string";
  }
  ownerId = ownerId.trim();
  if (!ObjectId.isValid(ownerId)) {
    throw "ownerId is not a valid id";
  }
  const userCollection = await users();
  const user = await userCollection.findOne({ _id: ObjectId(ownerId) });
  if (!user) {
    throw "User not found";
  }
  const userInfo = {
    username: user.username,
    pfp: user.profilePicture,
  };
  return userInfo;
}

module.exports = {
  getAll,
  getUser,
  checkUser,
  createUser,
  updateUserEm,
  updateUserPfp,
  updateUserPwd,
  updateUserUsn,
  updateUserName,
  addPost,
  getUserData,
};
