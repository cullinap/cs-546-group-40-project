const express = require("express");
const router = express.Router();
const { playerData } = require("../data");
var xss = require("xss");

function searchNameCheck(name) {
  let nameRegex = /^[A-Za-z\s]*$/;
  return !nameRegex.test(name)
}

function checkInput(value) {
  if(
    value.trim().length === 0 || 
    typeof value !== 'string' ||
    searchNameCheck(value) ||
    value.split(' ').length === 1
  ) 
      return true
  return false
}

function checkApiValues(value) {
  if(!value)
      return 'N/A'
  return value
}

function formatNames(name) {
  name = name.split(' ').filter(word => word).join(' ')

  name = name.split(' ')
  first = name[0][0].toUpperCase() + name[0].substring(1)
  last = name[1][0].toUpperCase() + name[1].substring(1)

  return first + " " + last
}

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
      {msg: 'names must contain letters or not be empty and you must provide first and last name'})
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

router.get("/ladder", async (req, res) => {
  try {
    let nflLeaders;
    nflLeaders = await playerData.scoringLeaders();
    console.log(nflLeaders['receptions'])
    
    res.render("playerranking", {
      title: "Top 5 players for each statistic",
      passingYards: nflLeaders['passingYards'],
      rushingYards: nflLeaders['rushingYards'],
      receivingYards: nflLeaders['receivingYards'],
      sacks: nflLeaders['sacks'],
      passingTouchdowns: nflLeaders['passingTouchdowns'],
      quarterbackRating: nflLeaders['quarterbackRating']
    });
  } catch (e) {
    res.status(404).json({ error: "Not Found" });
  }
});

module.exports = router;
