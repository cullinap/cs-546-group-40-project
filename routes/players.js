const express = require("express");
const router = express.Router();
const { playerData } = require("../data");
var xss = require("xss");

function formatNames(name) {
  name = name
    .split(" ")
    .filter((word) => word)
    .join(" ");

  name = name.split(" ");
  first = name[0][0].toUpperCase() + name[0].substring(1);
  last = name[1][0].toUpperCase() + name[1].substring(1);

  return first + " " + last;
}

router.get("/playersearch", async (req, res) => {
  try {
    res.render("playerfinder", {title: "Player Finder"});
  } catch (e) {
    res.status(404).json({ error: "Not Found" });
  }
});

router.post("/searchplayers", async (req, res) => {
  try {
    let searchInput = req.body.playerSearchTerm;
    if (!searchInput) {
      throw "searchTerm is a required argument";
    }
    if (typeof searchInput != "string") {
      throw "searchTerm must be a string";
    }
    searchInput = xss(searchInput);
    searchInput = searchInput.trim();
    if (searchInput.length == 0) {
      throw "searchInput must not be empty";
    }
    const playerName = formatNames(searchInput);
    let playerStatData = await playerData.getPlayerIdMap();
    let playerId = playerStatData[playerName];
    if (!playerId) {
      throw "Player not found";
    }
    let playerStats = await playerData.getPlayerStatistics(playerId);
    let college = await playerData.getCollege(playerStats.college['$ref'])
    res.render("playersearchresult", {
      title: playerStats.shortName,
      player: playerStats,
      college: college.name
    });
  } catch (e) {
    res.status(400).render("playerfinder", {
      msg: e,
    });
  }
});

router.get("/ladder", async (req, res) => {
  try {
    let nflLeaders;
    nflLeaders = await playerData.scoringLeaders();
    res.render("playerranking", {
      title: "Top 5 players for each statistic",
      passingYards: nflLeaders["passingYards"],
      rushingYards: nflLeaders["rushingYards"],
      receivingYards: nflLeaders["receivingYards"],
      sacks: nflLeaders["sacks"],
      passingTouchdowns: nflLeaders["passingTouchdowns"],
      quarterbackRating: nflLeaders["quarterbackRating"],
    });
  } catch (e) {
    res.status(404).json({ error: "Not Found" });
  }
});

module.exports = router;
