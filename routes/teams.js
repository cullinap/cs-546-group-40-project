const express = require("express");
const router = express.Router();
const { userData, utilData, userTeamData } = require("../data");
var validator = require("email-validator");
const { ObjectId } = require("mongodb");


router.get("/teamcreator", async (req, res) => {
    try {
      res.render("createteam", {
        title: 'create a team'
      });
    } catch(e) {
      res.status(500).send(e);
    }
})

router.post("/addteam", async (req, res) => {
    if (!req.session.user) {
        res.status(403);
        return;
    }
    let uid = req.session.user.uid;
    let teamname = req.body.teamName

    try {
        let createTeam = await userTeamData.createTeam(
            ObjectId(uid), teamname
        )

        let response = await utilData.addTeam(
            ObjectId(uid), createTeam
        ) 
        
        if (createTeam) {
          res.redirect("/home");
        } else {
          res.status(500).send("Failed to create team.");
        }
        return;
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
      let playerTerm = req.body.playerAddTerm
  
      res.render("myteam", {
        username: username,
        team: playerTerm,
        title: `${username}'s team`,
      });
    } catch (e) {
      res.status(500).send(e);
    }
});

module.exports = router 