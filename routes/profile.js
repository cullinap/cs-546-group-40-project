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
  res.render("profile/profile", {
    username: username,
    email: email,
    pfp: profilePicture,
  });
});

router.get("changepfp", async (req, res) => {});

router.get("changeusn", async (req, res) => {});

router.get("changepwd", async (req, res) => {});

router.get("changeem", async (req, res) => {});

router.post("changepfp", async (req, res) => {});

router.post("changeusn", async (req, res) => {});

router.post("changepwd", async (req, res) => {});

router.post("changeem", async (req, res) => {});

module.exports = router;
