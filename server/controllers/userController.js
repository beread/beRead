const User = require('../models/userModel');

const userController = {};

userController.signup = async (req, res, next) => {
  try {
    //these info from client
    const { username, displayName, email, password } = req.body;
    const newUser = await new User({ username, email, password }).save();

    const feedObj = {
      displayName: displayName || username,
    };

    const updatedUser = await User.findByIdAndUpdate(
      newUser._id,
      { feed: feedObj },
      { new: true }
    );

    if (updatedUser) {
      res.locals.newUser = updatedUser;
      return next();
    } else {
      res.status(403).json('Cannot create new user!');
    }
  } catch (error) {
    return next({
      log: 'Error in userController.signup',
      message: { error: 'cannot create a new user' },
    });
  }
};

userController.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!password) res.status(404).json('Invalid email or password');

    const user = await User.findOne({ email }).exec();

    if (user && (await user.comparePassword(password))) {
      res.locals.user = user;
      return next();
    } else {
      res.status(404).json('Invalid email or password');
    }
  } catch (error) {
    return next({
      log: 'Error in userController.signin: ',
      message: { error: 'cannot sign in' },
    });
  }
};

userController.getUser = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    res.locals.user = user;
    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.getUser: ',
      message: { error: 'cannot get user' },
    });
  }
};

module.exports = userController;
