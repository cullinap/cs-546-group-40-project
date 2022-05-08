const express = require("express");
const router = express.Router();
const { playerData } = require("../data");

function checkInput(value) {
  if(value.trim().length === 0) 
      return true
  return false
}

router.get("/playersearch", async (req, res) => {
  try {
    res.render("playerfinder");
  } catch (e) {
    res.status(404).json({ error: "Not Found" });
  }
});

router.post("/searchplayers", async (req, res) => {
  if(checkInput(req.body.playerSearchTerm)){
    res.status(400).render(
      'playerfinder', 
      {msg: 'input must contain values and not be empty'})
  }
  
  try {
    const playerName = req.body.playerSearchTerm;
    let playerStatData = await playerData.getPlayerIdMap();
    let playerId = playerStatData[playerName];
    let playerStats = await playerData.getPlayerStatistics(playerId);

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
