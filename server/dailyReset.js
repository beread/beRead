const User = require('./models/userModel');

dailyReset = async () => {
    try {
      const users = await User.find();
      
      if (!users) {
        console.log({
          log: 'Error in dailyReset: ',
          message: { error: 'No users found' },
        });
      }
  
      for (let user of users) {
        let userId = user._id;
        let readDailyArticle = user.feed.readDailyArticle;
        let dailyStreak = user.feed.dailyStreak;
  
        if (!readDailyArticle && dailyStreak > 0) {
          await User.findByIdAndUpdate(userId, {
            $set: { 'feed.dailyStreak': 0 },
          });
        }
  
        await User.findByIdAndUpdate(
          userId,
          {
            $set: {
              'feed.readDailyArticle': false,
              'feed.timeStartedReading': null, 
              'feed.timeFinishedReading': null,
              'feed.timeSpentReading': 0,
              'feed.dailyReactions': [],
            },
          }
        );
      }

      console.log('RESET')

    } catch (error) {
      console.log({
        log: 'Error in dailyReset: ',
        message: { error: 'Cannot reset daily streak' },
      });
    }
  };
  
  module.exports = dailyReset;