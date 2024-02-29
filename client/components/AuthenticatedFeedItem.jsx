import React, { useState, useEffect } from 'react';

function AuthenticatedFeedItem(
  { 
    displayName, 
    email,
    userFeedData,
    dailyStreak
  }) {


  const handleReactionBtnClick = () => {
    console.log('handle btn click hit', isOpen);
    setIsOpen(true);
  };

  return (
    <>
      <div className="authenticated-feed-item-container">
        <div className="feed-item-header">
          <div className="user-info">
            <p className='authenticated-user-header'>Welcome back, <span style={{fontWeight: 400}}>{displayName}</span>. <span className='feed-item-email-text'>{email}</span></p>
          </div>
          <div className="feed-item-timestamp">
            {
              userFeedData.hasReadArticle && (
                <p>Read at {userFeedData.timeFinishedReading}.</p>
              )
            }
          </div>
        </div>
        <div className="feed-item-content">
          <div className="did-user-read-container">
            {/* <p>haven't read</p> */}
            {/* {
              !userFeedData.hasReadArticle 
              ? <p>You haven't read today's article.</p>
              : <p>You read today's article!</p>
            } */}
            {userFeedData.readDailyArticle ? (
              <p>
                {displayName.charAt(0).toUpperCase() + displayName.slice(1)}{' '}
                read the daily article in {userFeedData.timeSpentReading} minutes!
              </p>
            ) : (
              <p>
                {displayName.charAt(0).toUpperCase() + displayName.slice(1)}{' '}
                hasn't read the daily article yet.
              </p>
            )}
          </div>
          <div className="streak-container">
            {/* <p>user streak</p> */}
            <p>Daily streak: {dailyStreak}{dailyStreak > 5 && ' 🔥'}{dailyStreak > 10 && '🔥'}{dailyStreak > 15 && '🔥'}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthenticatedFeedItem;
