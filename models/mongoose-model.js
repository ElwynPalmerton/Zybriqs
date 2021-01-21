const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const {
  Zybriq,
  zybriqsSchema
} = require('./zybriqs-model');


//User schema.
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  googleID: String,
  Zybriqs: [zybriqsSchema]
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("user", userSchema);

module.exports = User;