const jwt = require("jsonwebtoken");
const User = require("../model/User");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    const decoded = jwt.verify(token, "crypto");
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      throw new Error("Try Again");
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    throw e;
  }
};

module.exports = verifyToken;
