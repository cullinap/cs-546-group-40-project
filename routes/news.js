const express = require("express");
const router = express.Router();
const { newsData } = require("../data");

router.get("/latestnews", async (req, res) => {
  try {
    let nflNews = await newsData.getNflNews();
    let collegeNews = await newsData.getCollegeFBNews();
    let baseballNews = await newsData.getBaseballNews();

    res.render("news", {
      title: "Latest News",
      nflArticles: nflNews.articles,
      collegeArticles: collegeNews.articles,
      baseballArticles: baseballNews.articles
    });
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }
});

module.exports = router;
