const SECRET = "heeeeee's tryin";
const md5 = require("md5");
const User = require("../models/User");
const fs = require("fs");

const createToken = username => {
  return `${username}:${generateSignature(username)}`;
};

//TODO add username and token to tokens

const generateSignature = username => md5(username + SECRET);

module.exports = { createToken };
