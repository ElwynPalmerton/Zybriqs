//https://whispering-castle-65063.herokuapp.com/
// https://git.heroku.com/whispering-castle-65063.git

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const passportGoogle = require('passport-google.js')

//mongo store.
const mongoStore = require("connect-mongo")(session);

const app = express();

//routes
const registerRoutes = require("./routes/register-routes");
const restoreRoutes = require("./routes/restore-routes");
const loginRoutes = require("./routes/login-routes");
const loadSavedRoutes = require("./routes/load-saved-route");
const deleteRoutes = require("./routes/delete-routes");
const saveRoutes = require("./routes/save-routes");
const User = require("./models/mongoose-model");
const {
  Zybriq,
  zybriqSchema
} = require("./models/zybriqs-model");

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`)
    else
      next()
  })
}

// SECRET = "Dumb secret"
// DATABASE_URL = "mongodb+srv://Elwyn-admin:O2DTmaWFbLETKnsj@cluster0-svbll.mongodb.net/Zybriqs?retryWrites=true&w=majority"


app.use(express.static(__dirname + "/client"));

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  })
);

let db;

app.use(
  session({
    store: new mongoStore({
      url: process.env.DATABASE_URL,
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose

  .connect(
    process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  )
  .then((dbConnection) => {
    db = dbConnection;
  })
  .catch((error) => {
    console.log("Mongo connection error:", error);
  });



mongoose.set("useCreateIndex", true);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let tempZybriq;

/////////////ROOT///////////////
app.get("/", (req, res) => {
  res.render("pages/index", {
    user: req.user,
  });
});

app.use("/register", registerRoutes);

app.use("/restore", restoreRoutes);

app.get("/restore", (req, res) => {
  res.render("pages/index", {
    user: req.user,
  });
});

app.use("/login", loginRoutes);

app.use("/saveName", saveRoutes);

app.use("/loadSavedNames", loadSavedRoutes);

app.use("/delete", deleteRoutes);

app.get("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

///Save over existing Zybriq.
app.get("/saveOver", (req, res) => {
  //Gets a list of all saved Zybriqs and sends it to the pages/saveOver.ejs view.
  let zibNames = [];
  let zibIds = [];

  for (let zib of req.user.Zybriqs) {
    zibNames.push(zib.name);
    zibIds.push(zib._id);
  }

  console.log("Rendering maxiumum Zybs");

  res.render("pages/saveOver.ejs", {
    user: req.user,
    zibNames: zibNames,
    zibIds: zibIds,
  });
});

app.get("/success", (req, res) => {
  res.render("pages/saveSuccess", {
    user: req.user,
    message: "Success",
    id: req.user.tempID,
  });
});

app.get("/registerSuccess", (req, res) => {
  console.log("in registerSuccess route.");

  console.log("isAuth ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.render("pages/registerSuccess", {
      user: req.user,
    });
  } else {
    res.redirect("/login");
  }
});

app.get("/getValue", (req, res) => {
  console.log(req.session);
});

app.get("/about", (req, res) => {
  res.render("pages/about", {
    user: req.user,
  });
});

//This is called form listSaved.ejs after the radio button for the saved Zibriq is selected.
//Redirects to /restre?savedZib=  _ID.
app.post("/loadState", (req, res) => {
  //console.log('In /loadState');

  let savedZybriq = req.body.name;

  res.redirect("restore?savedZib=" + savedZybriq);
}); //End of /loadState.

//Listening for port.
let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started.");
});

//app.listen(3000, console.log("Running server on port 3000"));