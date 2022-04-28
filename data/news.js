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

module.exports = { getNflNews };
