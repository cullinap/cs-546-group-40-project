(function ($) {
  const changePfpDiv = $("#myprofile-changepfp"),
    changeUsnDiv = $("#myprofile-changeusername"),
    changeEmDiv = $("#myprofile-changeemail"),
    changePwdDiv = $("#myprofile-changepassword"),
    pfpButton = $("#myprofile-pfpButton"),
    usnButton = $("#myprofile-usnButton"),
    emButton = $("#myprofile-emButton"),
    pwdButton = $("#myprofile-pwdButton"),
    pfpForm = $("#pfp-form"),
    usnForm = $("#usn-form"),
    emForm = $("#em-form"),
    pwdForm = $("#pwd-form"),
    pfpImg = $("#myprofile-pfp"),
    usnField = $("#myprofile-usn"),
    emField = $("#myprofile-em");

  function clickUpdatePfp(event) {
    event.preventDefault();
    hideAll();
    changePfpDiv.removeAttr("hidden");
  }
  function clickUpdateUsn(event) {
    event.preventDefault();
    hideAll();
    changeUsnDiv.removeAttr("hidden");
  }
  function clickUpdateEmail(event) {
    event.preventDefault();
    hideAll();
    changeEmDiv.removeAttr("hidden");
  }
  function clickUpdatePwd(event) {
    event.preventDefault();
    hideAll();
    changePwdDiv.removeAttr("hidden");
  }

  function hideAll() {
    changePfpDiv.attr("hidden", true);
    changeUsnDiv.attr("hidden", true);
    changeEmDiv.attr("hidden", true);
    changePwdDiv.attr("hidden", true);
  }

  pfpButton.bind("click", clickUpdatePfp);
  usnButton.bind("click", clickUpdateUsn);
  emButton.bind("click", clickUpdateEmail);
  pwdButton.bind("click", clickUpdatePwd);

  pfpForm.bind("submit", (event) => {
    event.preventDefault();
    let url = $("#pfpurl").val();
    if (!url) {
      alert("No URL was specified.");
      return;
    }
    if (url === pfpImg.attr("src")) {
      alert("Profile picture must be different from what is already set");
      return;
    }
    let request = $.post("/myprofile/changepfp", { pfpurl: url });
    request.done(function (textStatus) {
      pfpImg.attr("src", url);
      hideAll();
      alert(textStatus);
    });
    request.fail(function (textStatus) {
      alert(textStatus);
    });
  });
  usnForm.bind("submit", (event) => {
    event.preventDefault();
    let username = $("#username").val();
    if (!username) {
      alert("No username was specified.");
      return;
    }
    if (username === usnField.text()) {
      alert("Username must be different from what is already set");
      return;
    }
    let request = $.post("/myprofile/changeusn", { username: username });
    request.done(function (textStatus) {
      usnField.text(username);
      hideAll();
      alert(textStatus);
    });
    request.fail(function (textStatus) {
      alert(textStatus);
    });
  });
  emForm.bind("submit", (event) => {
    event.preventDefault();
    let email = $("#email").val();
    if (!email) {
      alert("No email was specified.");
      return;
    }
    if (email === emField.text()) {
      alert("Email must be different from what is already set");
      return;
    }
    let request = $.post("/myprofile/changeem", { email: email });
    request.done(function (textStatus) {
      emField.text(email);
      hideAll();
      alert(textStatus);
    });
    request.fail(function (textStatus) {
      alert(textStatus);
    });
  });
  pwdForm.bind("submit", (event) => {
    event.preventDefault();
    let password = $("#password").val();
    if (!password) {
      alert("No password was specified.");
      return;
    }
    let request = $.post("/myprofile/changepwd", { password: password });
    request.done(function (textStatus) {
      hideAll();
      alert(textStatus);
    });
    request.fail(function (textStatus) {
      alert(textStatus);
    });
  });
})(window.jQuery);
