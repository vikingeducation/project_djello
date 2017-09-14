const SECRET = "heeeeee's tryin";
const md5 = require("md5");
const User = require("../models/User");

const createSignedSessionId = username => {
  return `${username}:${generateSignature(username)}`;
};

const generateSignature = username => md5(username + SECRET);

module.exports = { createSignedSessionId };
