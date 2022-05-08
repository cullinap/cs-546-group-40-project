const gooogleapikey = "AIzaSyDC_mlAVWNslRgx8N37JYVeS3pWcYcG1jc";
const axios = require("axios");

const espnclips = `https://www.googleapis.com/youtube/v3/search?&key=${gooogleapikey}&channelId=UCiWLfSweyRNmLpgEHekhoAg&part=snippet,id&order=date&maxResults=20`;

async function getApiData(url) {
  let { data } = await axios.get(url);
  return data;
}

async function getEspnClips() {
  let {items} = await getApiData(espnclips);
  return items;
}

module.exports = {
  getEspnClips,
};
