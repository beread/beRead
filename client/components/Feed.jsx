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
  const [isModalOpen, setIsModalOpened] = useState(false);
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

  const handleModalToggle = () => {
    console.log('handle modal toggle hit', isModalOpen)
    setIsModalOpened(!isModalOpen);
  }

  //     'The Pink Fairy Armadillo is grabbing your article now! Pwease be patient uwu'

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
            <AuthenticatedFeedItem
              displayName={username} 
              email={email}
              />
            <p>FEED</p>
            {/* authorized user feed item: */}
            {
              (feedItems.length > 0)
              ? feedItems
              : <p className='empty-feed-text'>Feed is empty.</p>
            }
          </div>
          
          
          {/* <button
            id="gimme"
            // disabled={disValue}
            // onClick={handleClick}
            className=""
          >
            Button
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default Feed;
