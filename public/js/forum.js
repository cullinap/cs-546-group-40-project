(function ($) {
  $(document).ready(function () {
    var request = {
      method: "GET",
      url: "/forum/getrecentposts",
    };
    $.ajax(request).then(function (response) {
      recentsDiv = $("#forum-mrp");
      recentsList = $("#forum-mrp-list");
      recentsHdg = $("#forum-mrp-heading");
      for (let i = 0; i < response.length; i++) {
        let currPost = response[i];
        let newHyperlink = $(
          `<li><a href="/forum/discussion/${currPost.discussionId}">${currPost.content}</a></li>`
        );
        recentsList.append(newHyperlink);
      }
      if (response.length == 0) {
        recentsHdg.html("No posts found!");
      }
      recentsDiv.removeAttr("hidden");
    });
  });
  $(document).ready(function () {
    var request = {
      method: "GET",
      url: "/forum/getdiscussions",
    };
    $.ajax(request).then(function (response) {
      discDiv = $("#forum-disc");
      discList = $("#forum-disc-list");
      discHdg = $("#forum-disc-heading");
      for (let i = 0; i < response.length; i++) {
        let currDisc = response[i];
        let newHyperlink = $(
          `<li><a href="/forum/discussion/${currDisc._id}">${currDisc.topic}</a></li>`
        );
        discList.append(newHyperlink);
      }
      if (response.length == 0) {
        discHdg.html("No discussions found!");
      }
      discDiv.removeAttr("hidden");
    });
  });
})(window.jQuery);
