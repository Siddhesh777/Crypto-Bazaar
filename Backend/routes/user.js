const express = require("express");
const User = require("../model/User");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

//SIGNUP-ENDPOINT
router.post("/RegisterUser", async (req, res) => {
  try {
    const user = new User(req.body);
    if (user) {
      const token = jwt.sign({ _id: user._id }, "crypto");
      user.token = token;
      await user.save();
      res.status(201).send({ user, token });
    }
  } catch (e) {
    res.status(400).send("false");
  }
});

//LOGIN-ENDPOINT
router.post("/LoginUser", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = jwt.sign({ _id: user._id }, "crypto");
    if (user) {
      user.token = token;
      await user.save();
      res.status(201).send({ user, token });
    }
  } catch (e) {
    res.status(400).send("false");
  }
});

router.post("/addInPortfolio", verifyToken, async (req, res) => {
  try {
    const user = req.user;
    let portfolio = user.portfolio;
    let flag = false;
    for (let i = 0; i < portfolio.length; i++) {
      if (portfolio[i].coin_id === req.body.coin_id) {
        portfolio[i].coin_quantity += Number(req.body.coin_quantity);
        await user.save();
        flag = true;
      }
    }
    if (!flag) {
      portfolio.push({
        coin_id: req.body.coin_id,
        coin_quantity: req.body.coin_quantity,
      });
      await user.save();
    }
    res.send(user.portfolio);
  } catch (e) {
    res.send("false");
  }
});

router.post("/removeFromPortfolio", verifyToken, async (req, res) => {
  try {
    const user = req.user;
    let portfolio = user.portfolio;
    for (let i = 0; i < portfolio.length; i++) {
      if (portfolio[i].coin_id === req.body.coin_id) {
        portfolio[i].coin_quantity -= req.body.coin_quantity;
        if (portfolio[i].coin_quantity === 0) {
          portfolio.splice(i, 1);
        }
        await user.save();
      }
    }
    res.send(user.portfolio);
  } catch (e) {
    res.send("false");
  }
});

router.get("/getPortfolio", verifyToken, (req, res) => {
  const user = req.user;
  res.status(200).send({ portfolio: user.portfolio });
});

module.exports = router;
