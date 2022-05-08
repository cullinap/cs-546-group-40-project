const express = require("express");
const router = express.Router();
const { playerData } = require("../data");
var xss = require("xss");

function checkInput(value) {
  if(value.trim().length === 0) 
      return true
  return false
}

function checkApiValues(value) {
  if(!value)
      return 'N/A'
  return value
}

function formatNames(name) {
  name = name.split(' ')
  first = name[0][0].toUpperCase() + name[0].substring(1)
  last = name[1][0].toUpperCase() + name[1].substring(1)

  return first + " " + last
}

console.log(formatNames("khalid dj"))

function checkPlayerImage(img) {
  if(!img)
      return "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
  return img
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
    const searchInput = xss(req.body.playerSearchTerm)
    const playerName = formatNames(searchInput);
    let playerStatData = await playerData.getPlayerIdMap();
    let playerId = playerStatData[playerName];
    if(!playerId){
      res.status(400).render(
        'playerfinder', 
        {msg: 'player not found'})
    }

    let playerStats = await playerData.getPlayerStatistics(playerId);

    res.render("playersearchresult", {
      title: playerName,
      playerSearchTerm: checkApiValues(playerName),
      playerPhoto: checkApiValues(playerStats["headshot"]),
      playerWeight: checkApiValues(playerStats["weight"]),
      playerAge: checkApiValues(playerStats["age"]),
      playerCareerLength: checkApiValues(playerStats["experience"]),
    });
  } catch (e) {
    res.status(404);
  }
});

module.exports = router;
