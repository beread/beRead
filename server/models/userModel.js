const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  followedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  feed: {
    displayName: { type: String, default: null },
    readDailyArticle: { type: Boolean, default: false },
    timeFinishedReading: { type: Date, default: null },
    timeSpentReading: { type: Number, default: 0 },
    dailyStreak: { type: Number, default: 0 },
    dailyReactions: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        reaction: {
          type: String,
          required: true,
        },
      },
    ],
  },
});

userSchema.pre('save', function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);

        this.password = hash;

        return next();
      });
    });
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (passwordInput) {
  return await bcrypt.compare(passwordInput, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;

// articlesRead : {
//     type: Array,
//     required: true,
// },
// amtOfArticles : {
//     type: Number,
//     required: true,
//     default: 0
// }
