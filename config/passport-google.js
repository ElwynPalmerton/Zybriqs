const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/mongoose-model');

const GOOGLE_CLIENT_ID = "317441507555-cbqd655r37mam0q0d9d8dvpvgh914pl9.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "YEBEBfZ7mvYlkuR_EiYrXzB8"


passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,  //process.env.GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,  //process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/login/google/success",
},
  function (accessToken, refreshToken, profile, done) {
    console.log("Google profile: ", profile)
    //if: 
    //the current user is in the db, send the user with done:
    //else: 
    //Create a new User and send it along with done.
    User.findOne({ googleID: profile.id }).then((currentUser) => {
      if (currentUser) {
        console.log('User is: ', currentUser);
        done(null, currentUser);
      } else {
        new User({
          username: profile.displayName,
          googleID: profile.id,
        }).save()
          .then((newUser) => {
            console.log('new user');
            done(null, newUser);
          })
      }
    })
  }
))