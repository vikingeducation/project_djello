//make some users
//NOTE: OLD CODE

const mongoose = require("mongoose");
const connect = require("../mongo");

const { User } = require("../models");

const seed = async () => {
  if (!mongoose.connection.readyState) {
    //drop db first
    console.log("seeding users");
    await connect();
    User.create({
      username: "Bob",
      password: "blaahhh",
      accessToken: "Dank"
    });
    User.create({
      username: "Karl",
      password: "KarlRules",
      accessToken: "Memez"
    });
    User.create({
      username: "a",
      password: "a",
      accessToken: "DankMemez"
    });
  }
};
seed();
