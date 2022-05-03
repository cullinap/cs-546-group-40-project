const express = require("express");
const router = express.Router();
const { homeData } = require("../data");

router.get("/", async (req, res) => {
  try {
    let news = await homeData.getNflNews();
    let { sports } = await homeData.getNflTeams();
    res.render("home", {
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
