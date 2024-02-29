const User = require('../models/userModel');

const feedController = {};

feedController.getFollowedUsersFeedData = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).populate({
      path: 'followedUsers',
      select: 'feed',
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if there are followed users to process
    if (user.followedUsers.length === 0) {
      res.locals.followedUsersData = [];
      return next();
    }

    const followedUsersData = user.followedUsers.map(
      (followedUser) => followedUser.feed
    );

    console.log('logging followed users data: ', followedUsersData);

    res.locals.followedUsersData = followedUsersData;
    return next();
  } catch (error) {
    return next({
      log: `Error in feedController.getFollowedUsersFeedData: ${error}`,
      message: { error: 'Cannot get followed users feed data' },
    });
  }
};

feedController.postReaction = async (req, res, next) => {
    try {
        const { username, postUsername, reaction } = req.body;

        const user = await User.findOne({ username });
        const postUser = await User.findOne({ username: postUsername });

        if (!user || !postUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const reactionObj = {
            userId: user._id,
            reaction,
        };

        const updatedUser = await User.findByIdAndUpdate(
            postUser._id,
            { $push: { 'feed.dailyReactions': reactionObj } },
            { new: true }
        );

        res.locals.updatedUser = updatedUser;
        return next();
    } catch (error) {
        return next({
            log: `Error in feedController.postReaction: ${error}`,
            message: { error: 'Cannot post reaction' },
        });
    }
};

feedController.deleteReaction = async (req, res, next) => {
    try {
        const { username, postUsername } = req.body;

        const user = await User.findOne({ username });
        const postUser = await User.findOne({ username: postUsername });

        if (!user || !postUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            postUser._id,
            { $pull: { 'feed.dailyReactions': { userId: user._id } } },
            { new: true }
        );

        res.locals.updatedUser = updatedUser;
        return next();
    } catch (error) {
        return next({
            log: `Error in feedController.deleteReaction: ${error}`,
            message: { error: 'Cannot delete reaction' },
        });
    }
}

module.exports = feedController;
