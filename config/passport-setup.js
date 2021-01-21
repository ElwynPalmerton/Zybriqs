const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/mongoose-model');


passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
})


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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

// username: String,
// password: String,
// email: String,
// googleID: String,
// Zybriqs: [zybriqsSchema]

// function (accessToken, refreshToken, profile, done) {
//   console.log(profile);
//   User.findOne({ googleId: profile.id }).then((currentUser) => {
//     if (currentUser) {
//       console.log('user is: ', currentUser);
//       done(null, currentUser);

//     } else {
//       //Create the user.
//       new User({
//         userName: profile.displayName,
//         googleId: profile.id
//       }).save().then((newUser) => {
//         console.log('new user created: ', newUser);
//         done(null, newUser);
//       });
//     }
//   })
// }