const express = require("express");
const router = express.Router();
const { newsData } = require("../data");

router.get("/ladder", async (req, res) => {
  try {
    let nflNews = await newsData.getNflNews();
  
    res.render("playerranking", {
      title: "Latest News",
      nflArticles: nflNews.articles
    });
  } catch (e) {
    res.status(500).json({ error: e });
    return;
  }
});

module.exports = router;
