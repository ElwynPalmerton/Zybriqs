const router = require("express").Router();
const passport = require("passport");
const User = require("../models/mongoose-model");
const passportLocalMongoose = require("passport-local-mongoose");
const { Zybriq, zybriqsSchema } = require("../models/zybriqs-model");

//loadSavedName/...

router.get("/", (req, res) => {
  //console.log("in load Data");
  if (req.isAuthenticated()) {
    Zybriq.find({
      // name: "HelloThere",
    })
      .then((foundZybriq) => {
        // console.log(foundZybriq[1].name);
        // console.log(foundZybriq[1].state);

        let zibNames = [];
        let zibIds = [];

        for (let zib of req.user.Zybriqs) {
          zibNames.push(zib.name);
          zibIds.push(zib._id);
        }

        res.render("pages/listSaved", {
          user: req.user,
          zibNames: zibNames,
          zibIds: zibIds,
        });

        //res.render
        //Create the res.render fild under l

        //res.send(foundZybriq.state);
      })
      .catch((err) => {
        console.log(err);
      }); //end of findOne.
  } else {
    res.cameFrom = "loadRoute";
    res.render("pages/login", {
      user: req.user,
      msg: "You must be logged in to restore your save Zybriqses.",
      cameFrom: "loadRoute",
    });
  }
});

module.exports = router;
