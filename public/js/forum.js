(function ($) {
  forumInterface = $("#forum");
  createDiscButton = $("#forum-cd-button");
  newDiscussionFormDiv = $("#forum-newdisc-form");
  newDiscussionForm = $("#newdisc-form");
  cancelDiscButton = $("#forum-cd-cancel-button");

  function clickCreateButton(event) {
    event.preventDefault();
    forumInterface.attr("hidden", true);
    newDiscussionFormDiv.removeAttr("hidden");
  }
  function clickCancelButton(event) {
    event.preventDefault();
    forumInterface.removeAttr("hidden");
    newDiscussionFormDiv.attr("hidden", true);
  }
  createDiscButton.bind("click", clickCreateButton);
  cancelDiscButton.bind("click", clickCancelButton);
  newDiscussionForm.bind("submit", (event) => {
    event.preventDefault();
    let topic = $("#topic").val();
    if (!topic) {
      alert("No topic was specified.");
      return;
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
