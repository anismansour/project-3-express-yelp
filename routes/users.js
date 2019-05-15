const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ user });
  } catch (err) {
    res.json({ err });
  }
});

router.delete("/:id/restaurants/:restId", async (req, res) => {
  const foundUser = await User.findById(req.params.id);
  foundUser.restaurantId = foundUser.restaurantId.filter(r => {
    return r.id != req.params.restId;
  });
  await foundUser.save();
  res.json({ user: foundUser });
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ user });
  } catch (err) {
    res.json({ err });
  }
});

router.put("/", (req, res) => {
  return res.json({ data: "Received a PUT HTTP method user" });
});

router.delete("/", (req, res) => {
  return res.json({ data: "Received a DELETE HTTP method user" });
});

router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    res.json({
      user: foundUser,
      success: foundUser ? false : true
    });
  } catch (err) {
    res.json({ err });
  }
});
router.put("/:id/restaurants/:restId", async (req, res) => {
  console.log(req.body.todo);
  try {
    const user = await User.findById(req.params.id);
    console.log(user);
    let rest = user.restaurantId[req.params.restId];
    rest.note = req.body.todo;
    user.markModified("restaurantId");
    await user.save();
    res.json({
      data: user,
      success: true,
      message: "added a note!"
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.json({ err });
    } else {
      res.json({
        success: true,
        message: "logged out!"
      });
    }
  });
});

module.exports = router;
