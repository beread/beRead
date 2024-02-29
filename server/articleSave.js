const axios = require('axios');
const cheerio = require('cheerio');
const Article = require('./models/articleModel');

function removeHtmlFormatting(text) {
  // Remove basic HTML tags
  let cleanedText = text;
  cleanedText = cleanedText.replace(/<[^>]+>/g, '');

  // Remove inline styles, CSS classes, and IDs in a single step
  cleanedText = cleanedText.replace(/(style|class|id)="[^"]+"/gi, '');

  // Remove CSS styles enclosed in braces and any remaining CSS class names and IDs
  cleanedText = cleanedText.replace(/\{[^}]+\}/g, '');
  cleanedText = cleanedText.replace(/(\.[^\s\{]+|\#[^\s\{]+)/g, '');

  // Remove Wikimedia markup patterns, such as file links
  cleanedText = cleanedText.replace(/\[\[File:[^\]]+\]\]/g, '');

  // Aggressively remove bracketed numeric references like [1], [2], etc.
  cleanedText = cleanedText.replace(/\[\d+\]/g, '');

  // Remove common wiki markup patterns and list markers
  cleanedText = cleanedText.replace(/(\s+)(li|ol|ul)(\s+)/g, '$1$3');

  cleanedText = cleanedText.replace(/(\s+)(li|ol|ul)(\s+|\s*,\s*)/g, '$1')

  // Collapse multiple spaces and newlines into a single space for cleaner output
  cleanedText = cleanedText.replace(/\s+/g, ' ').trim();

  return cleanedText;
// Remove file links
}

const articleSave = async () => {
  try {

    
    const getCurrentDateFormatted = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      return `${year}/${month}/${day}`;
    };


    const dateFormatted = getCurrentDateFormatted();
    const response = await axios.get(
      `https://api.wikimedia.org/feed/v1/wikipedia/en/featured/${dateFormatted}`
    );

    const article = response.data.tfa;
    const {
      title,
      extract: description,
      content_urls: {
        desktop: { page: articleUrl },
      },
    } = article;

    const pageResponse = await axios.get(articleUrl);
    const $ = cheerio.load(pageResponse.data);
    const originalText = $('#mw-content-text .mw-parser-output').text();

    // console.log('text', originalText.slice(0, 500));

    const text = removeHtmlFormatting(originalText);

    console.log('cleaned text', text.slice(0, 2000));

    // Uncomment this block to check for duplicates before saving.
    const duplicate = await Article.findOne({ title });
    if (duplicate) {
      console.log('Article already exists.');
      return;
    }

    await new Article({ title, description, text, article })
      .save()
      .then(() => {
        console.log('Article saved successfully.');
      })
      .catch((err) => {
        console.error('Error saving article: ', err);
      });
  } catch (err) {
    console.error('Error in articleSave function: ', err);
  }
};

// articleSave();

module.exports = articleSave;
