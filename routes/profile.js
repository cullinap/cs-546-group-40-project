const express = require("express");
const router = express.Router();
const { userData } = require("../data");
var validator = require("email-validator");

router.get("/myprofile", async (req, res) => {
  if (!req.session.user) {
    res.redirect("/");
    return;
  }
  let { username, email, profilePicture } = await userData.getUser(
    req.session.user.email
  );
  res.render("profile", {
    username: username,
    email: email,
    pfp: profilePicture,
    title: `${username}'s Profile`,
  });
});

router.post("/myprofile/changepfp", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  const email = req.session.user.email;
  let pfpUrl = req.body.pfpurl;
  if (!email) {
    res.status(400).send("Email is a required field");
    return;
  }
  if (!pfpUrl) {
    res.status(400).send("Profile picture URL is a required field");
    return;
  }
  if (typeof email != "string") {
    res.status(400).send("Email must be a string");
    return;
  }
  if (typeof pfpUrl != "string") {
    res.status(400).send("Profile picture URL is not a string");
    return;
  }
  pfpUrl = pfpUrl.trim();
  let response = await userData.updateUserPfp(email, pfpUrl);
  if (response) {
    res.status(200).send("Successfully changed profile picture.");
  } else {
    res.status(500).send("Failed to change profile picture.");
  }
  return;
});

router.post("/myprofile/changeusn", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  const email = req.session.user.email;
  let username = req.body.username;
  if (!email) {
    res.status(400).send("Email is a required field");
    return;
  }
  if (!username) {
    res.status(400).send("username is a required field");
    return;
  }
  if (typeof email != "string") {
    res.status(400).send("Email must be a string");
    return;
  }
  if (typeof username != "string") {
    res.status(400).send("username is not a string");
    return;
  }
  username = username.trim();
  let response = await userData.updateUserUsn(email, username);
  if (response) {
    res.status(200).send("Successfully changed username.");
    req.session.user.username = username;
    req.session.save();
  } else {
    res.status(500).send("Failed to change username.");
  }
  return;
});

router.post("/myprofile/changepwd", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  const email = req.session.user.email;
  let password = req.body.password;
  if (!email) {
    res.status(400).send("Email is a required field");
    return;
  }
  if (!password) {
    res.status(400).send("password is a required field");
    return;
  }
  if (typeof email != "string") {
    res.status(400).send("Email must be a string");
    return;
  }
  if (typeof password != "string") {
    res.status(400).send("password is not a string");
    return;
  }
  password = password.trim();
  let response = await userData.updateUserPwd(email, password);
  if (response) {
    res.status(200).send("Successfully changed password.");
  } else {
    res.status(500).send("Failed to change password.");
  }
  return;
});

router.post("/myprofile/changeem", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  const email = req.session.user.email;
  let newemail = req.body.email;
  if (!email) {
    res.status(400).send("Email is a required field");
    return;
  }
  if (!newemail) {
    res.status(400).send("newemail is a required field");
    return;
  }
  if (typeof email != "string") {
    res.status(400).send("Email must be a string");
    return;
  }
  if (typeof newemail != "string") {
    res.status(400).send("newemail is not a string");
    return;
  }
  newemail = newemail.trim().toLowerCase();
  if (!validator.validate(newemail)) {
    res.status(400).send("Email is not valid");
    return;
  }
  let response = await userData.updateUserEm(email, newemail);
  if (response) {
    res.status(200).send("Successfully changed Email.");
    req.session.user.email = newemail;
    req.session.save();
  } else {
    res.status(500).send("Failed to change Email.");
  }
  return;
});

module.exports = router;
