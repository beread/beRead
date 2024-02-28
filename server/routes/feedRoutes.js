const express = require('express');
const feedController = require('../controllers/feedController');

const router = express.Router();

// router.get('/test', (req,res) => {res.status(200).json('routeworks')})

router.get(
  '/getFeed/:username',
  feedController.getFollowedUsersFeedData,
  (req, res) => {
    res.status(200).json(res.locals.followedUsersData);
  },
);

router.post('/post', feedController.postReaction, (req, res) => {
  res.status(200).json(res.locals.updatedUser);
});

module.exports = router;
