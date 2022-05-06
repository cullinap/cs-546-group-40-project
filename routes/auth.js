const express = require("express");
const router = express.Router();
const { userData } = require("../data");
var validator = require("email-validator");

// Login, Logout, Signup

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    if (!email) {
      throw "Email is a required field";
    }
    if (!password) {
      throw "Password is a required field";
    }
    if (typeof email != "string") {
      throw "Email must be a string";
    }
    if (typeof password != "string") {
      throw "Password must be a string";
    }
    email = email.trim().toLowerCase();
    if (!validator.validate(email)) {
      throw "Email is not valid";
    }
    password = password.trim().toLowerCase();
    if (password.length < 6) {
      throw "Password should be more than 6 characters";
    }
  } catch (e) {
    return res.status(400).render("home", { error: e });
  }
  try {
    let correctLogin = await userData.checkUser(email, password);
    if (correctLogin) {
      let user = await userData.getUser(email);
      req.session.user = { username: user.username, email: user.email };
      res.redirect("/");
    }
  } catch (e) {
    return res.status(400).render("home", {
      error: e,
    });
  }
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  let { email, password } = req.body;
  try {
    if (!email) {
      throw "Email is a required field";
    }
    if (!password) {
      throw "Password is a required field";
    }
    if (typeof email != "string") {
      throw "Email must be a string";
    }
    if (typeof password != "string") {
      throw "Password must be a string";
    }
    email = email.trim().toLowerCase();
    password = password.trim().toLowerCase();
    if (password.length < 6) {
      throw "Password should be more than 6 characters";
    }
  } catch (e) {
    return res.redirect("/");
  }
  try {
    let newUser = await userData.createUser(email, password);
    if (newUser) {
      res.redirect("/");
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (e) {
    return res.status(400).render("signup", {
      error: e,
    });
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  return res.redirect("/");
});

module.exports = router;
