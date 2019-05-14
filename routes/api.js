const express = require("express");
const router = express.Router();
const yelp = require("yelp-fusion");
const client = yelp.client(
  "syjJTTevF19unuFf-wseo_EJgQOu5pyBEf4qAwkgHxyhpPZuPi3B49uE-4V9LWac-SAcK7hatIbA-IRSBcjy5Op0JR-lVD2xx46xnzbbBgB3AZF2ebf0kH2AUJnUXHYx"
);
const User = require("../models/User");

router.get("/", async (req, res) => {
  client
    .search({
      term: "restaurant",
      location: "san francisco, ca",
      limit: 50
    })
    .then(response => {
      let restaurantName = response.jsonBody.businesses;
      console.log(restaurantName, "this is the name");
      console.log(
        response.jsonBody.businesses[0].name,
        "this is from the jsonBody"
      );
      res.json({
        status: 200,
        data: restaurantName
      });
    })
    .catch(e => {
      console.log(e);
    });
});

router.post("/:id", async (req, res) => {
  try {
    console.log("hit");
    console.log(req.params.id);
    const foundUser = await User.findById(req.params.id);
    console.log(foundUser);
    foundUser.restaurantId.push(req.body);
    await foundUser.save();
    res.json({
      success: true
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/", (req, res) => {
  return res.json({ data: "Received a PUT HTTP method" });
});

router.delete("/restaurants/:id", async (req, res) => {
  //return res.json({ data: "Received a DELETE HTTP method" });
  try {
    const foundUser = await User.findById(req.params.id);
    console.log(foundUser);
    // const foundUser = await User.findOne({
    //   restaurant: req.params.id
    // });
    // await foundUser.restaurants.remove(req.params.id);
    // await foundUser.save();
    // res.json({ user: foundUser });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
