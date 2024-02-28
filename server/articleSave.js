const User = require('./models/userModel');
const axios = require('axios');
const Article = require('./models/articleModel');

articleSave = async () => {
  try {
    const getCurrentDateFormatted = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      return `${year}/${month}/${day}`;
    };

    const dateFormatted = getCurrentDateFormatted();

    const response = await axios
      .get(
        `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${dateFormatted}`
      )
      .then(async (response) => {
        console.log('response', response);
        const article = response.data.tfa;
        const { title } = article;
        const description = article.extract;

        const duplicate = await Article.findOne({ title });

        if (!duplicate) {
          await new Article({ title, description, article }).save();
        }
      });
  } catch (err) {
    console.error('Error in saving article: ', err);
  }
};
// articleSave();
module.exports = articleSave;
