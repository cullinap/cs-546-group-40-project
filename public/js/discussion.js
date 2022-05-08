(function ($) {
  createPostButton = $("#discussion-cp-button");
  discussionFormDiv = $("#discussion-cp-div");
  newPostForm = $("#newpost-form");
  cancelPostButton = $("#discussion-cp-cancel-button");
  postList = $("#discussion-post-list");
  function clickCreateButton(event) {
    event.preventDefault();
    discussionFormDiv.removeAttr("hidden");
  }
  function clickCancelButton(event) {
    event.preventDefault();
    discussionFormDiv.attr("hidden", true);
  }
  createPostButton.bind("click", clickCreateButton);
  cancelPostButton.bind("click", clickCancelButton);
  newPostForm.bind("submit", (event) => {
    event.preventDefault();
    const qp = window.location.href.split("/");
    let discussionId = qp[qp.length - 1];
    console.log(discussionId);
    let content = $("#content").val();
    if (!content) {
      alert("No topic was specified.");
      return;
    }
    let request = $.post("/forum/addpost", {
      discussionId: discussionId,
      postContent: content,
    });
    request.done(function (data, textStatus, jqXHR) {
      alert(jqXHR.responseText);
      location.reload(true);
    });
    request.fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseText);
    });
  });
})(window.jQuery);
