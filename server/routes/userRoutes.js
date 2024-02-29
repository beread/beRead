const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.signup, (req, res) => {
  res.status(200).json({
    _id: res.locals.newUser._id,
    username: res.locals.newUser.username,
    email: res.locals.newUser.email,
  });
  //   return res.redirect("/");
});

router.post('/signin', userController.signin, (req, res) => {
  res.status(200).json({
    _id: res.locals.user._id,
    username: res.locals.user.username,
    email: res.locals.user.email,
  });
  //   return res.redirect("/");
});

router.get('/:username', userController.getUser, (req, res) => {
  res.status(200).json({
    _id: res.locals.user._id,
    username: res.locals.user.username,
    email: res.locals.user.email,
  });
});

module.exports = router;
