const axios = require("axios");

const nflNews =
  "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news";

const nflTeams =
  "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams";

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

module.exports = { getNflNews, getNflTeams };
