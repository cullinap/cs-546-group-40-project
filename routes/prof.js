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

module.exports = router;
