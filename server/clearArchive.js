const Article = require('./models/articleModel');

function clearArchive() {
  Article.deleteMany({})
    .then(() => console.log('Archive cleared'))
    .catch((err) => console.log(err));
}

// clearArchive();

module.exports = clearArchive;