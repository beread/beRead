const axios = require("axios");

const wikipediaController = {};

wikipediaController.getArticleOfTheDay = async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://api.wikimedia.org/feed/v1/wikipedia/en/featured/2024/02/27"
    );
    const article = response.data.tfa;
    const { title } = article;
    const description = article.extract;

    console.log("article", article);

    res.locals.articleOfTheDay = { title, description, article };

    return next();
  } catch (err) {
    return next({
      log: "Error in wikipediaController",
      message: { error: "Cannot fetch article of the day from Wikipedia" },
    });
  }
};

module.exports = wikipediaController;
