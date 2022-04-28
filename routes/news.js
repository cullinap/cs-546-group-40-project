const express = require("express");
const router = express.Router();
const data = require("../data");
const playerData = require("../data/players");
const { ObjectId } = require("mongodb");
const axios = require("axios");

const nflNews =
  "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news";

async function getApiData(url) {
  let { data } = await axios.get(url);
  return data;
}

async function getNflNews() {
  let apiData = await getApiData(nflNews);
  return apiData;
}

router.route("/latestnews").get(async (req, res) => {
  try {
    let { articles } = await getNflNews();
    res.render("posts/news", { title: "Latest News", articles: articles });
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }
});

module.exports = router;
