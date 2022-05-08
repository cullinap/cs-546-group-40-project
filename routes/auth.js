const express = require("express");
const router = express.Router();
const { userData } = require("../data");
var validator = require("email-validator");
var xss = require("xss");

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
    return res.status(400).render("home", { title: "Home", alert: e });
  }
  try {
    let user = await userData.checkUser(email, password);
    if (user) {
      req.session.user = { uid: user._id, username: user.username, email: user.email };
      res.redirect("/");
    }
  } catch (e) {
    return res.status(400).render("home", {
      title: "Home",
      alert: e,
    });
  }
});

router.get("/signup", async (req, res) => {
  res.render("signup", { title: "Signup" });
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
    email = xss(email.trim().toLowerCase());
    password = password.trim().toLowerCase();
    if (password.length < 6) {
      throw "Password should be more than 6 characters";
    }
  } catch (e) {
    return res.render("signup", { title: "Signup", alert: e });
  }
  try {
    let newUser = await userData.createUser(email, password);
    if (newUser) {
      res.render("home", {
        alert: "Successfully signed up. Log in with your credentials.",
      });
    } else {
      res.status(500).send("Internal Server Error");
    }
  } catch (e) {
    return res.status(400).render("signup", {
      title: "Signup",
      alert: e,
    });
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  return res.redirect("/");
});

module.exports = router;
