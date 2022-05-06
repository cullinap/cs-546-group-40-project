const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.user_data;
const bcrypt = require("bcrypt");
const saltRounds = 16;
var validator = require("email-validator");

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
  return true;
}

async function updateUserPfp(email, pfpUrl) {
  if (!email) {
    throw "Email is a required field";
  }
  if (!pfpUrl) {
    throw "Profile picture URL is a required field";
  }
  if (typeof email != "string") {
    throw "Email must be a string";
  }
  if (typeof pfpUrl != "string") {
    throw "Profile picture URL is a string";
  }
  email = email.trim().toLowerCase();
  pfpUrl = pfpUrl.trim();
  if (!validator.validate(email)) {
    throw "Email is not valid";
  }
  const userCollection = await users();
  const update = await userCollection.updateOne(
    { email: email },
    { $set: { profilePicture: pfpUrl } }
  );
  return update.modifiedCount != 0;
}

async function updateUserName(email, firstname, lastname) {
  if (!email) {
    throw "Email is a required field";
  }
  if (!firstname) {
    throw "First name is a required field";
  }
  if (!lastname) {
    throw "Last name is a required field";
  }
  if (typeof email != "string") {
    throw "Email must be a string";
  }
  if (typeof firstname != "string") {
    throw "First name is not a string";
  }
  if (typeof lastname != "string") {
    throw "Last name is not a string";
  }
  email = email.trim().toLowerCase();
  firstname = firstname.trim();
  lastname = lastname.trim();
  if (!validator.validate(email)) {
    throw "Email is not valid";
  }
  const userCollection = await users();
  const update = await userCollection.updateOne(
    { email: email },
    { $set: { firstName: firstname, lastName: lastname } }
  );
  return update.modifiedCount != 0;
}

async function updateUserUsn(email, username) {
  if (!email) {
    throw "Email is a required field";
  }
  if (!username) {
    throw "Username is a required field";
  }
  if (typeof email != "string") {
    throw "Email must be a string";
  }
  if (typeof username != "string") {
    throw "Username is not a string";
  }
  email = email.trim().toLowerCase();
  username = username.trim();
  if (!validator.validate(email)) {
    throw "Email is not valid";
  }
  const userCollection = await users();
  const user = await userCollection.findOne({ username: username });
  if (user) {
    throw "Username already present in system";
  }
  const update = await userCollection.updateOne(
    { email: email },
    { $set: { username: username } }
  );
  return update.modifiedCount != 0;
}

async function updateUserEm(email, newemail) {
  if (!email) {
    throw "Email is a required field";
  }
  if (!newemail) {
    throw "newemail is a required field";
  }
  if (typeof email != "string") {
    throw "Email must be a string";
  }
  if (typeof newemail != "string") {
    throw "newemail is not a string";
  }
  email = email.trim().toLowerCase();
  newemail = newemail.trim().toLowerCase();
  if (!validator.validate(email)) {
    throw "Email is not valid";
  }
  if (!validator.validate(newemail)) {
    throw "newemail is not valid";
  }
  const userCollection = await users();
  const user = await userCollection.findOne({ email: newemail });
  if (user) {
    throw "Email already present in system";
  }
  const update = await userCollection.updateOne(
    { email: email },
    { $set: { email: newemail } }
  );
  return update.modifiedCount != 0;
}

async function updateUserPwd(email, password) {
  if (!email) {
    throw "Email is a required field";
  }
  if (!password) {
    throw "password is a required field";
  }
  if (typeof email != "string") {
    throw "Email must be a string";
  }
  if (typeof password != "string") {
    throw "password is not a string";
  }
  email = email.trim().toLowerCase();
  password = password.trim();
  if (!validator.validate(email)) {
    throw "Email is not valid";
  }
  const userCollection = await users();
  const update = await userCollection.updateOne(
    { email: email },
    { $set: { password: await bcrypt.hash(password, saltRounds) } }
  );
  return update.modifiedCount != 0;
}
async function getAll() {
  const userCollection = await users();
  const userList = await userCollection.find({}).toArray();
  return userList;
}

async function getUser(email) {
  if (!email) {
    throw "Email is a required field";
  }
  if (typeof email != "string") {
    throw "Email must be a string";
  }
  email = email.trim().toLowerCase();
  if (!validator.validate(email)) {
    throw "Email is not valid";
  }
  const userCollection = await users();
  const user = await userCollection.findOne({ email: email });
  if (!user) {
    throw "User not found";
  }
  return user;
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
};
