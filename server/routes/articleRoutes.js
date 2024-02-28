const express = require('express');
const openAiController = require('../controllers/openAiController');
const articleController = require('../controllers/articleController');
const wikipediaController = require('../controllers/wikipediaController');

const router = express.Router();

router.get('/getDailyArticle', articleController.getArticle, (req, res) => {
  res.status(201).json(res.locals.mostRecentArticle);
});

router.get(
  '/generateArticleHistory/:id',
  articleController.generateArticleHistory,
  (req, res) => {
    res.status(200).json(res.locals.generateArticleHistory);
  }
);

router.put('/checkIsRead', articleController.checkIsRead, (req, res) => {
  res.status(200).json(res.locals.findArticle);
});

router.get(
  '/articleOfTheDay',
  wikipediaController.getArticleOfTheDay,
  (req, res) => {
    res.status(200).json(res.locals.articleOfTheDay);
  }
);

module.exports = router;
