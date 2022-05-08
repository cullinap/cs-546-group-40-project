const tmkey = "wzuxUrBwYoxW1iS7FUQ2dAvFMHAHfmpW";
const axios = require("axios");

const tm = `https://app.ticketmaster.com/discovery/v2/events.json?size=1&keyword="football"&apikey=${tmkey}`;

async function getApiData(url) {
  let { data } = await axios.get(url);
  return data;
}

async function getTicketmaster() {
  let res = await getApiData(tm);
  console.log(res);
  return res;
}

module.exports = {
  getTicketmaster,
};
