const router = require("express").Router();
const passport = require("passport");
const User = require("../models/mongoose-model");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const { Zybriq, zybriqsSchema } = require("../models/zybriqs-model");

//Restores the Zybriqs to the main restore page after it has
//been requested by the front-end javascript.

//The restore  GET route is in app.js. I couldn't get it to work through this router... something to do with the directory naming. I think that it was rendering the html but couldn't find the static files. But, anyhoo...
//The GET route sends the index.ejs file
//This POST request comes from the front-end (loadData.js) js and
//sends the state data.
//restore POST route.
//loadData in loadData.js is called from sketch.js. This initialized the restored Zybriq state.

router.post("/", (req, res) => {
  let id = req.body.zibID;
  //let id = req.session.zybriqsID;

  console.log("ID in restore route: ", id);
  Zybriq.findOne({
    _id: id,
  })
    .then((foundZybriq) => {
      res.send(foundZybriq.state);
      //Sends the state back to loadData.js which initializes the Zybriq animation.
    })
    .catch((err) => {
      console.log(err);
    });
});

//This GET request is made from loadSessionState in loadData.js.
//Generally, the initial state is initialized in setup in sketch.js.
//This means that it either uses a restored Zybriq, a session state, or one of the default JSON objects in designPresets.js.
router.get("/session", (req, res) => {
  res.send(req.session.state);
  //This is called from loadSessionState in loadData.js which is
  //called during setup to initialize the Zybriq state.
});

module.exports = router;
