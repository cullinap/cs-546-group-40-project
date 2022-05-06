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
    $.post("/myprofile/changepfp", { pfpurl: url }, function () {
      pfpImg.attr("src", url);
      alert("Successfully set profile picture!");
      hideAll();
      return;
    });
    alert("Failed to set profile picture.");
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
    $.post("/myprofile/changeusn", { username: username }, function () {
      usnField.text(username);
      alert("Successfully set username!");
      hideAll();
      return;
    });
    alert("Failed to set email.");
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
    $.post("/myprofile/changeem", { email: email }, function () {
      emField.text(email);
      alert("Successfully set email!");
      hideAll();
      return;
    });
    alert("Failed to set email.");
  });
  pwdForm.bind("submit", (event) => {
    event.preventDefault();
    let password = $("#password").val();
    if (!password) {
      alert("No password was specified.");
      return;
    }
    $.post("/myprofile/changepwd", { password: password }, function () {
      alert("Successfully set password!");
      hideAll();
      return;
    });
    alert("Failed to set password.");
  });
})(window.jQuery);
