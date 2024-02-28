import { useNavigate, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, Component } from 'react';
import { logout } from '../slices/reducers/authSlice';
import {
  useSaveArticleMutation,
  useCheckIsReadMutation,
} from '../slices/api/articleSlice';
import { Navbar } from './Navbar';
import FeedItem from './FeedItem.jsx';
import AuthenticatedFeedItem from './AuthenticatedFeedItem.jsx';
import ArticleDisplay from './ArticleDisplay.jsx';

function Feed() {
  // This is where our times requests from front end will be.
  // handle click event that does does fetch request
  // should we employ use effect and use state?

  // const [myFeed, setMyFeed] = useState(
  //   'Click the "Gimme Dat" button for a new article'
  // );
  // const [disValue, setdisValue] = useState(false);
  // const [clickValue, setclickValue] = useState('GIMME DAT');
  // const [articleId, setArticleId] = useState('');

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [feedItems, setFeedItems] = useState([]);
  // const [userDB, setUserDB] = useState({});
  const userData = useSelector((state) => state.auth);
  console.log('user data: ', userData);
  // const dispatch = useDispatch();

  // Get current authorized user data:
  const username = userData.userData.username;
  const email = userData.userData.email;
  const userId = userData.userData._id;

  useEffect(() => {
    const tempFeedItems = [];
    // console.log('username: ', username);
    fetch(`http://localhost:3000/api/feed/getFeed/${username}`)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          tempFeedItems.push(
            <FeedItem
              key={'key ' + item.displayName}
          dailyReactions={item.dailyReactions}
              dailyStreak={item.dailyStreak}
              displayName={item.displayName}
              readDailyArticle={item.readDailyArticle}
              timeFinishedReading={item.timeFinishedReading}
              timeSpentReading={item.timeSpentReading}
              user={username}
              userId={userId}
            />
          );
        });
        setFeedItems(tempFeedItems);
      })
      .catch((err) => {
        console.log('there was an error in feed: ', err);
      });
  }, []);

  // Get current article data:
  // console.log('feed data: ', feedData);

  // // console.log(userData.userData._id)

  // const [savedArticle] = useSaveArticleMutation();
  // const [checkIsRead] = useCheckIsReadMutation();

  // const feedArticle = async () => {
  //   setMyFeed(
  //     'The Pink Fairy Armadillo is grabbing your article now! Pwease be patient uwu'
  //   );
  //   try {
  //     const res = await savedArticle({
  //       userId: userData.userData._id,
  //     }).unwrap();
  //     setArticleId(res._id);
  //     console.log(res._id);
  //     setMyFeed(res.content);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleClick = () => {
  //   feedArticle();

  //   setdisValue(true);
  //   setclickValue('disabled');
  //   console.log('button clicked');
  //   setTimeout(() => {
  //     console.log('done waiting!');
  //     setdisValue(false);
  //     setclickValue('GIMME DAT');
  //     setMyFeed('Click the "Gimme Dat" button for a new article');
  //   }, 20000);
  // };

  // const logoutHandler = () => {
  //   dispatch(logout());
  //   navigate('/');
  //   console.log('click');
  // };

  // const readClickHandler = () => {
  //   checkIsRead({ articleId });
  // };

  return (
    <div>
      <div />
      <div className="outer-feed-container">
        <div className="nav-column">
          <div className="outer-nav-container">
            <Navbar userData={userData} />
          </div>
        </div>
        <div className="feed-column">
          <ArticleDisplay />
          <div id="feedbox">
            <p>FEED</p>
            {/* authorized user feed item: */}
            <AuthenticatedFeedItem displayName={username} email={email} />
            {feedItems}
          </div>
          {/* {disValue && <button onClick={readClickHandler}>Read</button>} */}
          <button
            id="gimme"
            // disabled={disValue}
            // onClick={handleClick}
            className=""
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feed;
