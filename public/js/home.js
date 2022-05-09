(function ($) {
  const newsEndpoint =
      "https://site.api.espn.com/apis/site/v2/sports/football/nfl/news",
    teamsEndpoint =
      "https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams",
    playerEndpoint =
      "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes?limit=1000",
    playerIdEndpoint =
      "https://cullinap.github.io/data_sources/player_id_map.json",
    playerDataEndpoint =
      "https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/athletes/";
  //First, do news articles
  $(document).ready(function () {
    var request = {
      method: "GET",
      url: newsEndpoint,
    };
    $.ajax(request).then(function (response) {
      newsList = $("#home-articles");
      for (let i = 0; i < response.articles.length; i++) {
        const currArticle = response.articles[i];
        let newHyperlink = $(
          `<li><a href=${currArticle.links.web.href} target="_blank" class="text link">${currArticle.headline}</a></li>`
        );
        newsList.append(newHyperlink);
      }
      newsList.removeAttr("hidden");
    });
  });
  //Then do sports
  $(document).ready(function () {
    var request = {
      method: "GET",
      url: teamsEndpoint,
    };
    $.ajax(request).then(function (response) {
      const sportsList = $("#home-sports");
      let sports = response.sports;
      for (let i = 0; i < sports.length; i++) {
        let currSport = sports[i];
        let newHeader = $(`<h3 class="text">${currSport.name}</h3>`);
        var newSportsList = $(`<ul id="list-${currSport.slug}"></ul>`);
        let leagues = sports[i].leagues;
        for (let j = 0; j < leagues.length; j++) {
          let currLeague = leagues[j];
          let newHeader = $(`<h4 class="text">${currLeague.name}</h4>`);
          var newLeagueList = $(`<ul id="league-${currLeague.slug}"></ul>`);
          let teams = currLeague.teams;
          for (let k = 0; k < teams.length; k++) {
            let currTeam = teams[k].team;
            let newTeam = $(`<li class="text">${currTeam.displayName}</li>`);
            newLeagueList.append(newTeam);
          }
          newSportsList.append(newHeader);
          newSportsList.append(newLeagueList);
        }
        sportsList.append(newHeader);
        sportsList.append(newSportsList);
      }
      sportsList.removeAttr("hidden");
    });
  });
})(window.jQuery);
