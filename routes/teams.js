const express = require("express");
const router = express.Router();
const { userData, utilData, userTeamData } = require("../data");
const { ObjectId } = require("mongodb");
var xss = require("xss");

router.get("/teamcreator", async (req, res) => {
  try {
    res.render("createteam", {
      title: "create a team",
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/addteam", async (req, res) => {
  if (!req.session.user) {
    res.status(403).send("Not authorized");
    return;
  }
  try {
    let uid = req.session.user.uid;
    let teamname = req.body.teamName;
    if (!teamname) {
      res.status(400).send("teamname is a required field");
      return;
    }
    if (typeof teamname != "string") {
      res.status(400).send("uid must be a string");
      return;
    }
    teamname = xss(teamname.trim());
    let createTeam = await userTeamData.createTeam(uid, teamname);
    console.log(createTeam);
    let response = await utilData.addTeam(uid, createTeam._id);
    if (!response) {
      res.status(500).send("failed to add to user");
      return;
    }
    if (!createTeam) {
      res.status(500).send("Failed to create team.");
      return;
    }
    res.redirect("/");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/profile/myteam", async (req, res) => {
  if (!req.session.user) {
    res.status(403);
    return;
  }
  try {
    let { username } = await userData.getUser(req.session.user.uid);
    let teams = await res.render("myteam", {
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
