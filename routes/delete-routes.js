const router = require("express").Router();
const passport = require("passport");
const path = require("path");
const session = require("express-session");
const User = require("../models/mongoose-model");
const chalk = require("chalk");
const passportLocalMongoose = require("passport-local-mongoose");
const { Zybriq, zybriqsSchema } = require("../models/zybriqs-model");

router.get("/", (req, res) => {
  //Check authentication, elso go to login.
  //Create the ZibIDs and ZibNames arrays.
  //Create the post route and log the result to the console.
  if (req.isAuthenticated()) {
    let zibNames = [];
    let zibIds = [];

    for (let zib of req.user.Zybriqs) {
      zibNames.push(zib.name);
      zibIds.push(zib._id);
    }

    let msg = "Please select any Zybriqses you would like to delete.";
    if (zibNames.length === 0) {
      msg = "You do not have any saved Zybriqses to delete.";
    }

    res.render("pages/delete", {
      user: req.user,
      zibNames: zibNames,
      zibIds: zibIds,
      msg: msg,
    });
  } else {
    res.render("pages/login", {
      user: req.user,
      msg: "You must be logged in to save your Zybriqs.",
      cameFrom: "deleteRoute",
      //Don't forget to change this to delete route.
    });
  }
});

router.post("/", (req, res) => {
  //This is an array of zyb Id's.
  let itemsToBeDeleted = [];
  let deleteArray = req.body.zName;

  //req.body.name delivers a string if it is one element and an array if it is not.
  if (typeof deleteArray === "object") {
    itemsToBeDeleted = deleteArray;
  } else if (typeof deleteArray === "string") {
    itemsToBeDeleted.push(deleteArray);
  }

  itemsToBeDeleted.forEach((item) => {
    req.user.Zybriqs.pull(item);
    req.user.save();

    Zybriq.findByIdAndDelete(item)
      .then((result) => {
        console.log("Deleted: ", result);
      })
      .catch((err) => {
        console.log("err ", err);
      });
  });

  res.redirect("/saveName");
});

module.exports = router;
