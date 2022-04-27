const express = require("express");
const router = express.Router();
const data = require("../data");
const playerData = require("../data/players");
const { ObjectId } = require("mongodb");

router.route("/").get(async (req, res) => {
    try {
      res.json({'hello':'hello'})
    } catch(e) {
      res.status(400).json({ error: e });
      return 
    }
});

module.exports = router;
