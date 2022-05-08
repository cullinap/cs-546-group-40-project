const gooogleapikey = "AIzaSyAR61bJOkHhmef9rwE3GNSUVpcectGQrfk";
const axios = require("axios");

const espnclips = `https://www.googleapis.com/youtube/v3/search?&key=${gooogleapikey}&channelId=UCiWLfSweyRNmLpgEHekhoAg&part=snippet,id&order=date&maxResults=20`;
const nbcclips = `https://www.googleapis.com/youtube/v3/search?&key=${gooogleapikey}&channelId=UCqZQlzSHbVJrwrn5XvzrzcA&part=snippet,id&order=date&maxResults=20`;

async function getApiData(url) {
  let { data } = await axios.get(url);
  return data;
}

async function getEspnClips() {
  let {items} = await getApiData(espnclips);
  return items;
}

async function getNbcClips() {
  let {items} = await getApiData(nbcclips);
  return items;
}

module.exports = {
  getEspnClips,
  getNbcClips,
};
