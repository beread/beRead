const express = require('express');

const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const aiController = require('./controllers/openAiController');
const articleRouter = require('./routes/articleRoutes');
const socialRouter = require('./routes/socialRoutes');
const feedRouter = require('./routes/feedRoutes');
const readRouter = require('./routes/readRoutes');
const dailyReset = require('./dailyReset');
const articleSave = require('./articleSave');
const clearArchive = require('./clearArchive');
const { clear } = require('console');
const PORT = 3000;

// use dotenv
dotenv.config();
console.log(process.env.MONGO_URL);
app.use(express.json());

// allows the server to interact with website
app.use(cors());

// connect database
connectDB().then(() => articleSave());

app.use(express.static(path.join(__dirname, '../index.html')));

// use API routers
// clearArchive();
app.use('/api/user', userRouter);
app.use('/api/social', socialRouter);
app.use('/api/feed', feedRouter);
app.use('/api/read', readRouter);
//CHAT GPT - add to controller file to modularize
app.get('/api/openai', aiController.getArticle, (req, res) => {
  res.status(200).send(res.locals.getArticle);
});

app.use('/api/article', articleRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// error handlers for unknown page
app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

// global error handlers
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  // console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

// checks every five minutes if midnight just passed, if so runs dailyReset
setInterval(() => {
  const currentTime = new Date(Date.now());
  if (currentTime.getHours() === 0 && currentTime.getMinutes() < 6) {
    dailyReset();
    articleSave();
  }
}, 300000);

// articleSave();

module.exports = app;
