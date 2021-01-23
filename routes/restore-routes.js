const router = require('express').Router();
const passport = require('passport');
const User = require('../models/mongoose-model');
const session = require("express-session");
const passportLocalMongoose = require('passport-local-mongoose');
const {
  Zybriq,
  zybriqsSchema
} = require('../models/zybriqs-model');

//Restores the Zybriqs to the main restore page after it has
//.. been requested by the front-end javascript.

//restore route.
router.post("/", (req, res) => {
  let id = req.body.zibID;
  Zybriq.findOne({
    _id: id,
  })
    .then((foundZybriq) => {
      res.send(foundZybriq.state);
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get('/session', (req, res) => {
  console.log("in restore/session", req.session.state);
  res.send(req.session.state);

})

module.exports = router;