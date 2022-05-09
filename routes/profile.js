const express = require("express");
const router = express.Router();
const { userData, discussionData } = require("../data");
var validator = require("email-validator");
const { ObjectId } = require("mongodb");
var xss = require("xss");
const user_team = require("../data/user_team");

router.get("/profile", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }
  try {
    let { username, email, profilePicture, firstName, lastName, posts, teams } =
      await userData.getUser(req.session.user.uid);
    let postList = [];
    for (let i = 0; i < posts.length; i++) {
      postList.push(await discussionData.getPost(posts[i]));
    }
    let teamList = [];
    for (let i = 0; i < teams.length; i++) {
      teamList.push(await user_team.getTeam(teams[i]));
    }
    res.render("profile", {
      username: username,
      email: email,
      pfp: profilePicture,
      firstname: firstName,
      lastname: lastName,
      posts: postList,
      teams: teamList,
      title: `${username}'s Profile`,
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/profile/changepfp", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  let uid = req.session.user.uid;
  let pfpUrl = req.body.pfpurl;
  if (!uid) {
    res.status(400).send("uid is a required field");
    return;
  }
  if (!pfpUrl) {
    res.status(400).send("Profile picture URL is a required field");
    return;
  }
  if (typeof uid != "string") {
    res.status(400).send("uid must be a string");
    return;
  }
  if (typeof pfpUrl != "string") {
    res.status(400).send("Profile picture URL is not a string");
    return;
  }
  pfpUrl = xss(pfpUrl.trim());
  uid = uid.trim();
  if (!ObjectId.isValid(uid)) {
    res.status(400).send("uid is not a valid id");
    return;
  }
  try {
    let response = await userData.updateUserPfp(uid, pfpUrl);
    if (response) {
      res.status(200).send("Successfully changed profile picture.");
    } else {
      res.status(500).send("Failed to change profile picture.");
    }
    return;
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/profile/changename", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  let uid = req.session.user.uid;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  if (!uid) {
    res.status(400).send("uid is a required field");
    return;
  }
  if (!firstname) {
    res.status(400).send("First name is a required field");
    return;
  }
  if (!lastname) {
    res.status(400).send("Last name is a required field");
    return;
  }
  if (typeof uid != "string") {
    res.status(400).send("uid must be a string");
    return;
  }
  if (typeof firstname != "string") {
    res.status(400).send("First name is not a string");
    return;
  }
  if (typeof lastname != "string") {
    res.status(400).send("Last name is not a string");
    return;
  }
  firstname = xss(firstname.trim());
  lastname = xss(lastname.trim());
  uid = uid.trim();
  if (!ObjectId.isValid(uid)) {
    res.status(400).send("uid is not a valid id");
    return;
  }
  try {
    let response = await userData.updateUserName(uid, firstname, lastname);
    if (response) {
      res.status(200).send("Successfully changed name.");
    } else {
      res.status(500).send("Failed to change name.");
    }
    return;
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/profile/changeusn", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  let uid = req.session.user.uid;
  let username = req.body.username;
  if (!uid) {
    res.status(400).send("uid is a required field");
    return;
  }
  if (!username) {
    res.status(400).send("username is a required field");
    return;
  }
  if (typeof uid != "string") {
    res.status(400).send("uid must be a string");
    return;
  }
  if (typeof username != "string") {
    res.status(400).send("username is not a string");
    return;
  }
  username = username.trim();
  username = xss(username);
  uid = uid.trim();
  if (!ObjectId.isValid(uid)) {
    res.status(400).send("uid is not a valid id");
    return;
  }
  try {
    let response = await userData.updateUserUsn(uid, username);
    if (response) {
      res.status(200).send("Successfully changed username.");
      req.session.user.username = username;
      req.session.save();
    } else {
      res.status(500).send("Failed to change username.");
    }
    return;
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/profile/changepwd", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  let uid = req.session.user.uid;
  let password = req.body.password;
  if (!uid) {
    res.status(400).send("uid is a required field");
    return;
  }
  if (!password) {
    res.status(400).send("password is a required field");
    return;
  }
  if (typeof uid != "string") {
    res.status(400).send("uid must be a string");
    return;
  }
  if (typeof password != "string") {
    res.status(400).send("password is not a string");
    return;
  }
  password = password.trim();
  uid = uid.trim();
  if (!ObjectId.isValid(uid)) {
    res.status(400).send("uid is not a valid id");
    return;
  }
  try {
    let response = await userData.updateUserPwd(uid, password);
    if (response) {
      res.status(200).send("Successfully changed password.");
    } else {
      res.status(500).send("Failed to change password.");
    }
    return;
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/profile/changeem", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  let uid = req.session.user.uid;
  let newemail = req.body.email;
  if (!uid) {
    res.status(400).send("uid is a required field");
    return;
  }
  if (!newemail) {
    res.status(400).send("newemail is a required field");
    return;
  }
  if (typeof uid != "string") {
    res.status(400).send("uid must be a string");
    return;
  }
  if (typeof newemail != "string") {
    res.status(400).send("newemail is not a string");
    return;
  }
  newemail = newemail.trim();
  newemail = xss(newemail);
  if (!validator.validate(newemail)) {
    res.status(400).send("Email is not valid");
    return;
  }
  uid = uid.trim();
  if (!ObjectId.isValid(uid)) {
    res.status(400).send("uid is not a valid id");
    return;
  }
  try {
    let response = await userData.updateUserEm(uid, newemail);
    if (response) {
      res.status(200).send("Successfully changed Email.");
      req.session.user.email = newemail;
      req.session.save();
    } else {
      res.status(500).send("Failed to change Email.");
    }
    return;
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/profile/:id", async (req, res) => {
  let userid = req.params.id;
  try {
    let selUser = await userData.getUserData(userid);
    res.status(200).json(selUser);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/profile/myteam", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  try {
    let { username } = await userData.getUser(req.session.user.uid);
    res.render("myteam", {
      username: username,
      team: "playerOne",
      title: `${username}'s team`,
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/profile/addplayer", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  try {
    let { username } = await userData.getUser(req.session.user.uid);
    let playerTerm = req.body.playerAddTerm;

    res.render("myteam", {
      username: username,
      team: playerTerm,
      title: `${username}'s team`,
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
