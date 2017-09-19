// const mongoose = require("mongoose");
// const bluebird = require("bluebird");
// mongoose.Promise = bluebird;
//
// const {User, Board, List, Card, Activity } = require("../models");
//
// function capFirstLetter(resource) {
//   return resource.length < 1
//     ? resource
//     : resource.length < 2
//       ? resource.toUpperCase()
//       : `${resource.charAt(0).toUpperCase()}${resource.slice(1)}`;
// }
//
// // we'll need to add a resource name to the object we pass though
// const addResource = async resource => {
//   let model;
//   switch(Object.keys(resource)[0]){
//     case "user":
//       model = User;
//       break;
//     case "list":
//       model = List;
//       break;
//   }
//   const resourceKeys = Object.keys(model.schema.paths).filter(key => return key !== "_v")
//   const resourceObj = {};
//   resourceKeys.forEach((key) => resourceObj[key] = resource[key] || )
//
//   try {
//     return await new model.
//   }
//
// }
