const express = require("express");
const router = express.Router();
const { userData } = require("../data");

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
  });
});

router.post("/myprofile/changepfp", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  const email = req.session.user.email;
  const pfpUrl = req.body.pfpurl;
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
    res.status(400).send("Profile picture URL is a string");
    return;
  }
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
});

router.post("/myprofile/changepwd", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
});

router.post("/myprofile/changeem", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
});

module.exports = router;
