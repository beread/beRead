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
import ArticleModal from './ArticleModal.jsx';

function Feed() {
  const [feedItems, setFeedItems] = useState([]);
  const userData = useSelector((state) => state.auth);
  console.log('user data: ', userData);
  const [articleOfTheDay, setArticleOfTheDay] = useState({});
  const [isModalOpen, setIsModalOpened] = useState(false);
  const [readTimes, setReadTimes] = useState([]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [userFeedData, setUserFeedData] = useState({});
  const [dailyStreak, setDailyStreak] = useState();

  useEffect(() => {
    console.log('use effect hit');
    const getUserFeedData = () => {
      fetch(`http://localhost:3000/api/user/${username}`)
        .then((response) => response.json())
        .then((data) => {
          setUserFeedData(data);
        });
    };
    getUserFeedData();
    setDailyStreak(userFeedData.dailyStreak);
  }, []);

  useEffect(() => {
    setDailyStreak(userFeedData.dailyStreak);
  }, [userFeedData]);
  
  console.log('logging user feed data: ', userFeedData);

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

  const handleModalToggle = () => {
    console.log('handle modal toggle hit', isModalOpen);
    setIsModalOpened(!isModalOpen);
    const tempReadTimes = readTimes;
    tempReadTimes.push(Date.now());
    setReadTimes(tempReadTimes);
  };
  useEffect(() => {
    fetch(`http://localhost:3000/api/article/getDailyArticle`)
      .then((response) => response.json())
      .then((data) => {
        console.log('data: ', data);
        setArticleOfTheDay(data);
      })
      .catch((err) => {
        console.log('Error fetching article of the day: ', err);
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

  return (
    <div className="feed-image-background">
      <div />
      <div className="outer-feed-container">
        <div className="nav-column">
          <div className="outer-nav-container">
            <Navbar userData={userData} />
          </div>
        </div>
        <div className="feed-column">
          <div
            className="article-display-outer-container"
            onClick={handleModalToggle}
          >
            <ArticleDisplay />
          </div>
          {isModalOpen && (
            <ArticleModal
              setDailyStreak={setDailyStreak}
              dailyStreak={dailyStreak}
              article={articleOfTheDay}
              username={username}
              readTimes={readTimes}
              setReadTimes={setReadTimes}
              isModalOpen={isModalOpen}
              setIsModalOpened={setIsModalOpened}
            />
          )}
          <div id="feedbox">
            <AuthenticatedFeedItem
              displayName={username}
              email={email}
              userFeedData={userFeedData}
              dailyStreak={dailyStreak}
            />
            <p>FEED</p>
            {/* authorized user feed item: */}
            {feedItems.length > 0 ? (
              feedItems
            ) : (
              <p className="empty-feed-text">Feed is empty.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
