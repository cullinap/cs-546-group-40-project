const axios = require("axios");
const { playerData } = require(".");
const { player_data } = require("../config/mongoCollections");

const nflNews =
  "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news";

const nflTeams =
  "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams";

const nflPlayerData = 
  "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes?limit=1000"

async function getApiData(url) {
  let { data } = await axios.get(url);
  return data;
}

async function getNflNews() {
  let apiData = await getApiData(nflNews);
  return apiData;
}

async function getNflTeams() {
  let apiData = await getApiData(nflTeams);
  return apiData;
}

// temporary until I find a better home 
// 1. espn lists player data by link & their ID so access that first
// 2. for each link get the first name + last name and map to ID

async function getNflPlayerData() {
  let apiData = await getApiData(nflPlayerData);
  return apiData;
}

async function playerNameIdMap() {
  // map player name to espn player ID
  let apiData = await getNflPlayerData()
  let apiObject = apiData['items']

  playersObj = {}
  
  // const player of apiObject
  // using index for build/testing purpose & bc very slow
  for(let i = 10; i<20; ++i) {
    //individual_player_link = player['$ref']
    individual_player_link = apiObject[i]['$ref']
    let playerJSON = await getApiData(individual_player_link)
    playerName = playerJSON['firstName'] + ' ' + playerJSON['lastName']
    playersObj[playerName] = playerJSON['id']
  }

  return playersObj

}

module.exports = { 
  getNflNews, getNflTeams, getNflPlayerData, playerNameIdMap
};

