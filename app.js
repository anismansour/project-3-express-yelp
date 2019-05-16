const createError = require("http-errors");
const express = require("express");
// const path = require('path');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const yelp = require("yelp-fusion");
const session = require("express-session");
const client = yelp.client(process.env.MY_SECRET);
require("dotenv").config();

require("./db/db");

console.log(process.env.MY_SECRET);

const apiRouter = require("./routes/api");
const usersRouter = require("./routes/users");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: "string random",
    resave: false,
    saveUninitialized: false
  })
);

app.use("/api/v1", apiRouter);
app.use("/users", usersRouter);
// app.use('/restaurants', restaurantsRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

module.exports = app;
