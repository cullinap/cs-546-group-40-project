(function ($) {
  newDiscussionForm = $("#newdisc-form");
  newDiscussionForm.bind("submit", (event) => {
    event.preventDefault();
    let topic = $("#topic").val();
    if (!topic) {
      alert("No topic was specified.");
      return;
    }
    if (typeof topic != "string") {
      alert("Topic is not a string");
      return;
    }
    topic = topic.trim();
    if (topic.length == 0) {
      if (!topic) {
        alert("No topic was specified.");
        return;
      }
    }
    let request = $.post("/forum/creatediscussion", { topic: topic });
    request.done(function (data, textStatus, jqXHR) {
      window.location.href = `/forum/discussion/${data.discussionId}`;
    });
    request.fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseText);
    });
  });
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
          `<a class="list-group-item list-group-item-action" href="/forum/discussion/${currPost.discussionId}">"${currPost.content}" written by ${currPost.username}</a>`
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
          `<a class="list-group-item list-group-item-action" href="/forum/discussion/${currDisc._id}">"${currDisc.topic}" started by ${currDisc.username}</a>`
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
