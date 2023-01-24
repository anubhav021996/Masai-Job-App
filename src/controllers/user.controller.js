const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../models/user.model");
const Authentication = require("../middlewares/authentication.middleware");

const newToken = (user) => jwt.sign({ user }, process.env.screat_key);

router.post("/register", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if (user) return res.status(400).send("User already exists");

    let domain = req.body.email.split("@")[1];
    domain === "masaischool.com"
      ? (req.body.type = "admin")
      : (req.body.type = "user");

    user = await User.create(req.body);

    res.status(200).send("User Registered Successfully");
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("No user found");

    const match = user.checkPassword(req.body.password);
    if (!match) return res.status(400).send("Invalid Password");

    let token = newToken(user);

    res.status(200).send(token);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/getProfile", Authentication, async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id).lean().exec();
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
