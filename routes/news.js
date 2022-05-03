const express = require("express");
const router = express.Router();
const { homeData } = require("../data");

router.get("/latestnews", async (req, res) => {
  try {
    let news = await homeData.getNflNews();
    console.log(news)
    let { sports } = await homeData.getNflTeams();
    res.render("posts/news", {
      title: "Home",
      articles: news.articles,
      sports: sports,
    });
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }
});

module.exports = router;
