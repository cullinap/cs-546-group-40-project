const tmkey = "wzuxUrBwYoxW1iS7FUQ2dAvFMHAHfmpW";
const axios = require("axios");

const tmfb = `https://app.ticketmaster.com/discovery/v2/events.json?size=5&keyword="football"&apikey=${tmkey}`;
const tmbab = `https://app.ticketmaster.com/discovery/v2/events.json?size=5&keyword="baseball"&apikey=${tmkey}`;
const tmbb = `https://app.ticketmaster.com/discovery/v2/events.json?size=5&keyword="basketball"&apikey=${tmkey}`;

async function getApiData(url) {
  let { data } = await axios.get(url);
  return data;
}

async function getFootballTickets() {
  let res = await getApiData(tmfb);
  return res._embedded.events;
}

async function getBaseballTickets() {
  let res = await getApiData(tmbab);
  return res._embedded.events;
}
async function getBasketballTickets() {
  let res = await getApiData(tmbb);
  return res._embedded.events;
}

module.exports = {
  getFootballTickets,
  getBaseballTickets,
  getBasketballTickets,
};
