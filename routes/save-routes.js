const saveRoutes = require("express").Router();
const passport = require("passport");
const path = require("path");
const express = require("express");
const session = require("express-session");
const User = require("../models/mongoose-model");
const passportLocalMongoose = require("passport-local-mongoose");
const { Zybriq, zybriqsSchema } = require("../models/zybriqs-model");
const chalk = require("chalk");

const maxZybs = 3;

// app.use(express.static(__dirname + "/client"));

// Initial route
// for saving Zybriqses.
// Front-end js sends sends a post request of the Zybriq state here ////// from submitData (in loadData.js);

saveRoutes.post("/", (req, res) => {
  req.session.state = req.body.state;
  //console.log("In saveName root, post: ", req.user);
  //This just saves the state to the session variable so that it is available on the server after the user has logged in and chosen a name to save it under.
  //The get /saveName route below is handling the naming.
  res.send({
    user: req.user,
    message: "Success",
  });
});

//The save button calls the submitData() function in
//saveState.js which then uses Window.location.assign('/saveName');

saveRoutes.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    //CHeck this here and created redirect to Delete a Zybriqs.
    //Or let them replace a Zybriq.
    if (req.user.Zybriqs.length >= maxZybs) {
      res.redirect("/saveOver");
      res.end();
    } else {
      let msg;
      msg = "Please name your Zybriq:";
      if (req.session.exists === true) {
        //req.session.exists is assigned true if the /saveZybriq route tries to save the current Zybriq over an existing name.
        msg = "That Zybriq already exists. Choose a new name:";
        req.session.exists = false;
      }
      res.render("pages/saveName", {
        //pages/saveName takes a name as an input and sends the name to /saveZybriq to save the current Zybriq to mongo.
        user: req.user,
        message: msg,
      });
    }
  } else {
    res.render("pages/login", {
      user: req.user,
      msg: "You must be logged in to save your Zybriq.",
      cameFrom: "saveRoute",
    });
  }
});

saveRoutes.post("/saveOver", (req, res) => {
  //Takes the user selected/previously saves Zybriq and overwrites it with the current state.
  let zybID = req.body.zName;

  //req.session.zybriqsID = zybID;

  console.log(chalk.blue("user", req.user));
  console.log(chalk.magenta("zybID", zybID));

  let username = req.user.username;

  Zybriq.findOne({
    _id: zybID,
  }).then((zyb) => {
    zyb.state = req.session.state;
    zyb.save().then((savedZyb) => {
      res.redirect("/success");
      //It doesn't need to do this because it's using the session data anyway when it loads?
      console.log(chalk.pink(savedZyb.id));
      res.render("pages/saveSuccess.ejs", {
        user: req.user,
        message: "Success",
        id: savedZyb.id,
      });
    });
  });
});

saveRoutes.get("/session", (req, res) => {
  if (req.isAuthenticated()) {
    let state = JSON.parse(req.session.state);
    res.send(req.session.state);
  } else {
    res.send(null);
  }
});

//Called from the form in saveName.ejs.
//Receives the Zybriqs name and saves it to the database.
saveRoutes.post("/saveZibriq", (req, res) => {
  if (req.isAuthenticated()) {
    let zName = req.body.zName;

    req.session.exists = false; //Assumes that the name is not taken already and then checks for it in the database.

    User.find({
      $and: [
        {
          username: req.user.username,
        },
        {
          Zybriqs: {
            $elemMatch: {
              name: zName,
            },
          },
        },
      ],
    }).then((foundZyb) => {
      if (foundZyb.length !== 0) {
        res.redirect("/saveName");
        req.session.exists = true;
        exists = true; //This is redundant. Delete?
      } else {
        const tempZ = new Zybriq({
          name: req.body.zName,
          state: req.session.state,
        });

        tempZ.save();
        //Zybriq and User are both mongoose models.
        //This saves the Zybriq and then User.findOne saves that Zybriq to the array of Zybriqs on that user's db item.

        User.findOne({
          username: req.user.username,
        })
          .then((currentUser) => {
            currentUser.Zybriqs.push(tempZ);
            currentUser
              .save()
              .then((user) => {
                req.user.tempID = tempZ.id; //Where is this used?
                res.redirect("/success");
                // res.render("pages/saveSuccess", {
                //   user: req.user,
                //   message: "Success",
                //   id: tempZ.id,
                // });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });

        //
      }
    });
    //
    //Console.log the user out here.
  } else {
    res.redirect("/login");
  }
});

module.exports = saveRoutes;
