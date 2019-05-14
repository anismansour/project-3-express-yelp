const createError = require("http-errors");
const express = require("express");
// const path = require('path');
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const yelp = require("yelp-fusion");
const client = yelp.client(
  "syjJTTevF19unuFf-wseo_EJgQOu5pyBEf4qAwkgHxyhpPZuPi3B49uE-4V9LWac-SAcK7hatIbA-IRSBcjy5Op0JR-lVD2xx46xnzbbBgB3AZF2ebf0kH2AUJnUXHYx"
);
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

app.use("/api/v1", apiRouter);
app.use("/users", usersRouter);
// app.use('/restaurants', restaurantsRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// client
//   .search({
//     term: "Four Barrel Coffee",
//     location: "san francisco, ca"
//   })
//   .then(response => {
//     console.log(response.jsonBody.businesses[0].name);
//     restaurantName = response.jsonBody.businesses[0].name;
//     console.log(restaurantName, "this is the name");
//   })
//   .catch(e => {
//     console.log(e);
//   });

// // res.json({
// //   name: restaurant
// // })

// error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
