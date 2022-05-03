const axios = require("axios");
//const { playerData } = require(".");
const { player_data } = require("../config/mongoCollections");

const nflNews =
  "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news";

const collegeNews = 
    "http://site.api.espn.com/apis/site/v2/sports/football/college-football/news"

const baseballNews =
    "http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/news"

async function getApiData(url) {
    let { data } = await axios.get(url);
    return data;
}

async function getNflNews() {
    let apiData = await getApiData(nflNews);
    return apiData;
}

async function getCollegeFBNews() {
    let apiData = await getApiData(collegeNews);
    return apiData;
}

async function getBaseballNews() {
    let apiData = await getApiData(baseballNews);
    return apiData;
}

module.exports = { 
    getNflNews
    , getCollegeFBNews
    , getBaseballNews
};

