const User = require('../models/userModel');

const socialController = {};

socialController.followUser = async (req, res, next) => {
  try {
    const { username, followUsername } = req.body;

    const user = await User.findOne({ username });
    const friend = await User.findOne({ username: followUsername });

    if (!user || !friend) {
      return next({
        log: 'Error in userController.followUser: ',
        message: { error: 'User or friend not found' },
      });
    }

    const userId = user._id;
    const friendId = friend._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { followedUsers: friendId } },
      { new: true }
    );

    const updatedFriend = await User.findByIdAndUpdate(
      friendId,
      { $push: { followers: userId } },
      { new: true }
    );

    res.locals.user = updatedUser;
    res.locals.friend = updatedFriend;

    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.followUser: ',
      message: { error: 'Cannot follow user' },
    });
  }
};

socialController.getFollowedUsers = async (req, res, next) => {
  try {
    const { username } = req.params;

    await User.findOne({ username })
      .populate('followedUsers', 'username')
      .then((user) => {
        const followedUsernames = user.followedUsers.map(
          (followedUser) => followedUser.username
        );
        res.locals.followedUsers = followedUsernames;
        return next();
      });
  } catch (error) {
    return next({
      log: 'Error in userController.getfollowedUsers: ',
      message: { error: 'cannot get followedUsers' },
    });
  }
};

socialController.unfollowUser = async (req, res, next) => {
  try {
    const { username, friendUsername } = req.body;

    const user = await User.findOne({ username });
    const friend = await User.findOne({ username: friendUsername });

    if (!user || !friend) {
      return next({
        log: 'Error in userController.unfollowUser: ',
        message: { error: 'User or friend not found' },
      });
    }

    const userId = user._id;
    const friendId = friend._id;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { followedUsers: friendId } },
      { new: true }
    );

    const updatedFriend = await User.findOneAndUpdate(
      { _id: friendId },
      { $pull: { followers: userId } },
      { new: true }
    );

    res.locals.user = updatedUser;
    res.locals.friend = updatedFriend;

    return next();
  } catch (error) {
    return next({
      log: 'Error in userController.unfollowUser: ',
      message: { error: 'Cannot unfollow user' },
    });
  }
};

socialController.getFollowers = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) {
      return next({
        log: 'Error in userController.getFollowers: ',
        message: { error: 'User not found' },
      });
    }

    const userId = user._id;

    await User.findById(userId)
      .populate('followers', 'username')
      .then((user) => {
        const followersArray = user.followers.map(
          (follower) => follower.username
        );
        res.locals.followers = followersArray;
        return next();
      });
  } catch (error) {
    return next({
      log: 'Error in userController.getFollowers: ',
      message: { error: 'Cannot get followers' },
    });
  }
};

socialController.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
        res.locals.allUsers = users;
        return next();
  } catch (error) {
    return next({
      log: 'Error in userController.getAllUsers: ',
      message: { error: 'cannot get allUsers' },
    });
  }
};

module.exports = socialController;
