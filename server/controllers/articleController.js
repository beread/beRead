const Article = require('../models/articleModel');
const User = require('../models/userModel');

const articleController = {};

articleController.saveArticle = async (req, res, next) => {
  try {
    const { userId } = req.body;

    // check userId exist?
    const findUser = await User.findById({ _id: userId }).exec();

    if (findUser) {
      // create and save new article
      const savedArticle = await new Article({
        user: findUser._id,
        content: res.locals.getArticle,
      }).save();

      // check
      if (savedArticle) {
        // convert timestamp to readable format
        // const newDate = new Date(savedArticle.createdAt).toDateString();
        res.locals.savedArticle = savedArticle;
        return next();
      }
      res.status(403).json('Cannot save article!');
    } else {
      res.status(404).json('User not found!');
    }
  } catch (error) {
    return next({
      log: 'Error in articleController.saveArticle',
      error: 'Cannot save an article',
    });
  }
};

articleController.generateArticleHistory = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const findUser = await User.findById({ _id: userId });

    if (findUser) {
      const articleHistory = await Article.find({ user: findUser._id }).exec();

      if (articleHistory) {
        res.locals.generateArticleHistory = articleHistory;
        return next();
      }
      res.status(403).json('cannot get articleHistory');
    } else {
      res.status(404).json('User not found!');
    }
  } catch (error) {
    return next({
      log: 'Error in articleController.getArticleHistory',
      message: 'Cannot get article history!',
    });
  }
};

articleController.checkIsRead = async (req, res, next) => {
  const { articleId } = req.body;

  try {
    const findArticle = await Article.findOneAndUpdate({ _id: articleId }, { isRead: true }, { new: true });
    // console.log(findArticle)

    if (findArticle) {
      res.locals.findArticle = findArticle;
      return next();
    }
    res.status(404).json('Article not found!');
  } catch (error) {
    return next({
      log: 'Error in articleController.checkIsRead',
      message: 'Cannot change value for isRead',
    });
  }
};

module.exports = articleController;
