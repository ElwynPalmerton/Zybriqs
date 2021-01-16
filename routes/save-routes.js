const saveRoutes = require("express").Router();
const passport = require("passport");
const path = require("path");
const express = require("express");
const session = require("express-session");
const User = require("../models/mongoose-model");
const passportLocalMongoose = require("passport-local-mongoose");
const {
  Zybriq,
  zybriqsSchema
} = require("../models/zybriqs-model");

const maxZybs = 3;

// Initial route
// for saving Zybriqs 's.
// Front-end sends sends a post request of the Zybriq state here //////from submitData (in loadData.js);

saveRoutes.post("/", (req, res) => {
  req.session.state = req.body.state;
  //This just sends a success message.
  //The get /saveName route is handling the naming.
  res.send({
    user: req.user,
    message: "Success",
  });
});


saveRoutes.post("/saveOver", (req, res) => {
  //Takes the user selected/previously saves Zybriq and overwrites it with the current state.
  let zybID = req.body.zName;

  let username = req.user.username;

  Zybriq.findOne({
    _id: zybID,
  }).then((zyb) => {
    zyb.state = req.session.state;
    zyb.save().then((savedZyb) => {
      res.redirect('/success');
    });
  });
});



saveRoutes.get('/session', (req, res) => {
  if (req.isAuthenticated()) {
    let state = JSON.parse(req.session.state);
    res.send(req.session.state);
  } else {
    res.send(null);
  }
})


//The save button calls the submitData() function in
//saveState.js which then uses Window.location.assign('/saveName');
//Called from submitData() with assign();
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
        msg = "That Zybriq already exists. Choose a new name:";
        req.session.exists = false;
      } //This is probably a terrible
      res.render("pages/saveName", {
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

//Called from the form in saveName.ejs.
//Receives the Zybriqs name and saves it to the database.
saveRoutes.post("/saveZibriq", (req, res) => {
  if (req.isAuthenticated()) {
    let zName = req.body.zName;

    req.session.exists = false;

    User.find({
      $and: [{
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
        exists = true;
      } else {
        const tempZ = new Zybriq({
          name: req.body.zName,
          state: req.session.state,
        });

        tempZ.save();

        User.findOne({
          username: req.user.username,
        })
          .then((currentUser) => {
            currentUser.Zybriqs.push(tempZ);
            currentUser
              .save()
              .then((user) => {

                req.user.tempID = tempZ.id;
                res.redirect('/success');
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
  } else {
    res.redirect('/login');
  }
});

module.exports = saveRoutes;