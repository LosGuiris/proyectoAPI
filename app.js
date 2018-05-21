require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");

const DBURL = process.env.MONGODB_URL;

mongoose.Promise = Promise;
mongoose
  .connect(DBURL, { useMongoClient: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "maluca",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60 * 2 // 2 day
    })
  })
);
app.use((req, res, next) => {
  if (req.user) {
    app.locals.user = req.user;
  } else {
    app.locals.user = null;
  }
  next();
});

// Express View engine setup

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

hbs.registerHelper("bmr", (weight, height, age, gender) => {
  let bmr = 0;
  if (gender == "Male") {
    bmr = (66.473 + 13.7516 * weight + 5.0033 * height - 6.755 * age) * 1.2;
  } else {
    bmr = (655.0955 + 9.5634 * weight + 1.8496 * height - 4.6756 * age) * 1.2;
  }
  return Math.round(bmr);
});

hbs.registerHelper("ifUndefined", (value, options) => {
  if (arguments.length < 2)
    throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

hbs.registerHelper("round", value => {
  return Math.round(value);
});
hbs.registerHelper("dotdotdot", function(str) {
  if (str.length > 25) return str.substring(0, 25) + "...";
  return str;
});
hbs.registerHelper("ifEqual", function(value1, value2) {
  if (value1 === value2) {
    return value1;
  }
});

// default value for title local
app.locals.title = "Nutrition app";

app.use(flash());
require("./passport")(app);

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

const index = require("./routes/index");
app.use("/", index);

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

const searchRoutes = require("./routes/search");
app.use("/search", searchRoutes);

const recipeRoutes = require("./routes/recipe");
app.use("/recipe", recipeRoutes);

module.exports = app;
