import React, { useState } from 'react';
import ReactionPicker from './ReactionPicker';

function AuthenticatedFeedItem(
  { 
    displayName, 
    email
  }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleReactionBtnClick = () => {
    console.log('handle btn click hit', isOpen);
    setIsOpen(true);
  };

  return (
    <>
      <div className="feed-item-container">
        <div className="feed-item-header">
          <div className="user-info">
            <p><span style={{fontWeight: 400}}>{displayName}</span> <span className='feed-item-email-text'>{email}</span></p>
          </div>
          <div className="feed-item-timestamp">
            <p>7:30pm</p>
          </div>
        </div>
        <div className="feed-item-content">
          <div className="did-user-read-container">
            <p>haven't read</p>
          </div>
          <div className="streak-container">
            <p>user streak</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthenticatedFeedItem;
