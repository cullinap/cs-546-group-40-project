const express = require("express");
const router = express.Router();
const { playerData } = require("../data");

router.get("/playersearch", async (req, res) => {
  try {
    res.render("playerfinder");
  } catch (e) {
    res.status(404).json({ error: "Not Found" });
  }
});

router.post("/searchplayers", async (req, res) => {
  try {
    // if(checkInput(req.body.showSearchTerm)){
    //     res.status(400).render('error', {msg: 'input must contain values and not be empty'})
    // }
    const playerName = req.body.playerSearchTerm;
    console.log('here')
    let playerStatData = await playerData.getPlayerIdMap();
    console.log('here')
    let playerId = playerStatData[playerName];
    let playerStats = await playerData.getPlayerStatistics(playerId);
    // const showDataResults = Object.entries(showData).slice(0,5).map(entry => entry[1])

    res.render("playersearchresult", {
      title: playerName,
      playerSearchTerm: playerName,
      playerPhoto: playerStats["headshot"],
      playerWeight: playerStats["weight"],
      playerAge: playerStats["age"],
      playerCareerLength: playerStats["experience"],
    });
  } catch (e) {
    res.status(404);
  }
});

module.exports = router;
