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
  $(document).ready(function () {
    var request = {
      method: "GET",
      url: newsEndpoint,
    };
    $.ajax(request).then(function (response) {
      newsList = $("#home-articles");
      for (let i = 0; i < response.articles.length; i++) {
        let currArticle = response.articles[i];
        var newHyperlink = $(
          `<li><a href=${currArticle.links.web.href}>${currArticle.headline}</a></li>`
        );
        newsList.append(newHyperlink);
      }
      newsList.removeAttr("hidden");
    });
  });
})(window.jQuery);
