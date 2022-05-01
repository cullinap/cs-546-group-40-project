const express = require("express");
const router = express.Router();
const { homeData } = require("../data");

router.get("/player", async (req, res) => {
  try {
    res.render("posts/playerfinder");
  } catch (e) {
    res.status(404).json({ error: "Not Found" });
  }
});

router.post('/searchplayers', async (req, res) => {
  try {
      // if(checkInput(req.body.showSearchTerm)){
      //     res.status(400).render('posts/error', {msg: 'input must contain values and not be empty'})
      // }
      const playerName = req.body.playerSearchTerm;
      let playerData = await homeData.getPlayerIdMap();
      let playerId = playerData[playerName]
      let playerStats = await homeData.getPlayerStatistics(playerId)
      // const showDataResults = Object.entries(showData).slice(0,5).map(entry => entry[1])


      res.render('posts/playersearchresult', {
          title: 'Players found',
          playerSearchTerm: playerName, 
          someData: {
            weight: playerStats['weight']
            , age: playerStats['age']
          }
      })
  } catch(e) {
      res.status(404).json({error: '!Found'})
  }
})

module.exports = router;
