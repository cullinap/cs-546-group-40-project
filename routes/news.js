const express = require("express");
const router = express.Router();
const { homeData, playerData } = require("../data");

router.route("/latestnews").get(async (req, res) => {
  try {
    let { articles } = await homeData.getNflNews();
    res.render("posts/news", { title: "Latest News", articles: articles });
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }
});

module.exports = router;
