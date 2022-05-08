(function ($) {
  const changePfpDiv = $("#myprofile-changepfp"),
    changeUsnDiv = $("#myprofile-changeusername"),
    changeNameDiv = $("#myprofile-changename"),
    changeEmDiv = $("#myprofile-changeemail"),
    changePwdDiv = $("#myprofile-changepassword"),
    pfpButton = $("#myprofile-pfpButton"),
    nameButton = $("#myprofile-nameButton"),
    usnButton = $("#myprofile-usnButton"),
    emButton = $("#myprofile-emButton"),
    pwdButton = $("#myprofile-pwdButton"),
    pfpForm = $("#pfp-form"),
    nameForm = $("#name-form"),
    usnForm = $("#usn-form"),
    emForm = $("#em-form"),
    pwdForm = $("#pwd-form"),
    pfpImg = $("#myprofile-pfp"),
    nameField = $("#myprofile-name"),
    usnField = $("#myprofile-usn"),
    emField = $("#myprofile-em");

  function clickUpdatePfp(event) {
    event.preventDefault();
    hideAll();
    changePfpDiv.removeAttr("hidden");
  }
  function clickUpdateName(event) {
    event.preventDefault();
    hideAll();
    changeNameDiv.removeAttr("hidden");
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
    changeNameDiv.attr("hidden", true);
  }

  pfpButton.bind("click", clickUpdatePfp);
  usnButton.bind("click", clickUpdateUsn);
  nameButton.bind("click", clickUpdateName);
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
    let request = $.post("/profile/changepfp", { pfpurl: url });
    request.done(function (data, textStatus, jqXHR) {
      pfpImg.attr("src", url);
      hideAll();
      alert(jqXHR.responseText);
    });
    request.fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseText);
    });
  });
  nameForm.bind("submit", (event) => {
    event.preventDefault();
    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    if (!firstname) {
      alert("No first name was specified.");
      return;
    }
    if (!lastname) {
      alert("No lastname name was specified.");
      return;
    }
    if (firstname.includes(nameField.text())) {
      alert("First name must be different from what is already set");
      return;
    }
    let request = $.post("/profile/changename", {
      firstname: firstname,
      lastname: lastname,
    });
    request.done(function (data, textStatus, jqXHR) {
      nameField.text(`${firstname} ${lastname}`);
      hideAll();
      alert(jqXHR.responseText);
    });
    request.fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseText);
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
    let request = $.post("/profile/changeusn", { username: username });
    request.done(function (data, textStatus, jqXHR) {
      usnField.text(username);
      hideAll();
      alert(jqXHR.responseText);
    });
    request.fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseText);
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
    let request = $.post("/profile/changeem", { email: email });
    request.done(function (data, textStatus, jqXHR) {
      emField.text(email);
      hideAll();
      alert(jqXHR.responseText);
    });
    request.fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseText);
    });
  });
  pwdForm.bind("submit", (event) => {
    event.preventDefault();
    let password = $("#password").val();
    if (!password) {
      alert("No password was specified.");
      return;
    }
    let request = $.post("/profile/changepwd", { password: password });
    request.done(function (data, textStatus, jqXHR) {
      hideAll();
      alert(jqXHR.responseText);
    });
    request.fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseText);
    });
  });
})(window.jQuery);
