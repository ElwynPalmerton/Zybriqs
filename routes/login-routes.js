const router = require('express').Router();
const passport = require('passport');
const db = require('../config/passport-setup');
const session = require("express-session");
const User = require('../models/mongoose-model');
const passportLocalMongoose = require('passport-local-mongoose');
const {
  Zybriq,
  zybriqsSchema
} = require('../models/zybriqs-model');



router.get("/", (req, res) => {
  res.render("pages/login", {
    user: req.user,
    msg: "",
    cameFrom: "loginRoute",
  });
});

router.post("/", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });


  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
    (req, res, function () {

      console.log('authenticated: ');
      console.log(req.isAuthenticated);
      console.log(req.user);
      if (req.isAuthenticated) {
        var cameFrom = req.body.cameFrom;
        if (cameFrom === "loadRoute") {
          res.redirect("/loadSavedNames");
        } else if (cameFrom === "saveRoute") {
          res.redirect("/saveName");
        } else if (cameFrom === "deleteRoute") {
          res.redirect('/delete');
        } else {
          res.redirect("/");
          //Ad a flag to the request object? and check for it here?
        }
      } else {
        res.redirect("/login");
      }
    });
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))
// , (req, res) => {
//   console.log("login with google at '/google/ route.");
// }

router.get('/google/success', passport.authenticate('google'), (req, res) => {

  console.log('In /google/success route');
  // console.log(req.user);
  //req.user is available on the req object because it is deserialized by passport
  //passport.initialize() and cookieSession are necessary for this.
  // console.log("USER: ", req.user);
  // req.session.bleh = "bleh";
  // // res.send('You have reached the callback uri');
  res.redirect('/')

});



module.exports = router;