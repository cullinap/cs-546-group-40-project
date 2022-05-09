const axios = require("axios");
const mongoCollections = require("../config/mongoCollections");
const playerData = mongoCollections.player_data;
var xss = require("xss");

const playerIDMaps =
  "https://cullinap.github.io/data_sources/player_id_map.json";

const playerDataUrl =
  "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes/";

const scoringLeaderUrl =
  "https://site.api.espn.com/apis/site/v3/sports/football/nfl/leaders?season=2021";

async function getApiData(url) {
  try {
    let { data } = await axios.get(url);
    return data;
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  async getPlayerIdMap() {
    let apiData = await getApiData(playerIDMaps);
    return apiData;
  },

  async getPlayerStatistics(playerId) {
    if (!playerId) {
      throw "playerId is a required field";
    }
    if (typeof playerId != "string") {
      throw "playerId must be a string";
    }
    playerId = playerId.trim();
    let indPlayerUrl = playerDataUrl + playerId;
    let apiData = await getApiData(indPlayerUrl);
    return apiData;
  },

  async mapEspnIdToPlayer(espnid, firstName, lastName) {
    if (!espnid) {
      throw "espnid is a required field";
    }
    if (typeof espnid != "string") {
      throw "espnid must be a string";
    }
    if (!firstName) {
      throw "firstName is a required field";
    }
    if (!lastName) {
      throw "lastName is a required field";
    }
    if (typeof firstName != "string") {
      throw "First name is not a string";
    }
    if (typeof lastName != "string") {
      throw "Last name is not a string";
    }
    espnid = espnid.trim();
    firstName = xss(firstName.trim());
    lastName = xss(lastName.trim());
    const playerCollection = await playerData();
    let player = {
      espnid: espnid,
      firstName: firstName,
      lastName: lastName,
    };
    await playerCollection.insertOne(player);
    return player;
  },

  async getScoringLeaders() {
    const scoringLeaders = await getApiData(scoringLeaderUrl);
    return scoringLeaders;
  },

  async getCollege(href) {
    if (!href) {
      throw "link is a required field";
    }
    if (typeof href != "string") {
      throw "link must be a string";
    }
    href = xss(href.trim());
    const college = await getApiData(href);
    return college;
  },

  async scoringLeaders() {
    const scoringLeaders = await getApiData(scoringLeaderUrl);
    let categories = scoringLeaders["leaders"]["categories"];
    // console.log(scoringLeader['leaders']['categories'][0]['leaders'][0]['athlete']['displayName'])

    let obj = {};
    for (let i = 0; i <= 10; ++i) {
      let subList = [];
      for (let j = 1; j <= 5; ++j) {
        subList.push(categories[i]["leaders"][j]["athlete"]["displayName"]);
      }
      obj[categories[i]["name"]] = subList;
    }

    return obj;
  },

  async createPlayer(
    firstName,
    lastName,
    debutYear,
    headshotPicture,
    position,
    profilePicture,
    teamId,
    playerRanking
  ) {
    const playerCollection = await playerData();
    const player_data = await playerNameIdMap();

    let newPlayer = {
      firstName: firstName,
      lastName: lastName,
      debutYear: debutYear,
      headshotPicture: headshotPicture,
      position: position,
      profilePicture: profilePicture,
      teamId: teamId,
      playerRanking: playerRanking,
    };

    const insertInfo = await playerCollection.insertOne(newPlayer);

    return newPlayer;
  },

  async getAll() {
    const playerCollection = await playerData();
    const userList = await playerCollection.find({}).toArray();

    return userList;
  },

  async getAllUsersIdAndName() {
    const playerCollection = await playerData();
    const userList = await playerCollection
      .find({}, { projection: { firstName: 1 } })
      .toArray();
    return userList;
  },
};
