import React, { useEffect, useState } from 'react';
import ReactionPicker from './ReactionPicker';


function FeedItem({
  dailyReactions,
  dailyStreak,
  displayName,
  readDailyArticle,
  timeFinishedReading,
  timeSpentReading,
  email,
  user,
  userId,
}) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  
  useEffect(() => {
    setLikes(dailyReactions.length);
  }, [dailyReactions]);

  useEffect(() => {
    dailyReactions.forEach((reaction) => {
      if (reaction.userId === userId) {
        setLiked(true);
      }
    });
  }, []);


  const handleClick = () => {
    console.log('likes:', likes);
    console.log(dailyReactions)
    console.log('userId:', userId);
    if (!liked) {
      fetch('http://localhost:3000/api/feed/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          post: 'like',
          postUsername: displayName,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          setLikes(likes + 1);
          setLiked(true);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <>
      <div className="feed-item-container">
        <div className="feed-item-header">
          <div className="user-info">
            <p>
              <span style={{ fontWeight: 400 }}>
                {displayName.charAt(0).toUpperCase() + displayName.slice(1)}
              </span>{' '}
              <span className="feed-item-email-text">{email}</span>
            </p>
          </div>
          <div className="feed-item-timestamp">
            <p>
              {timeFinishedReading
                ? new Date(timeFinishedReading).toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })
                : ''}
            </p>
          </div>
        </div>
        <div className="feed-item-content">
          <div className="did-user-read-container">
            {readDailyArticle ? (
              <p>
                {displayName.charAt(0).toUpperCase() + displayName.slice(1)}{' '}
                read the daily article in {timeSpentReading} minutes!
              </p>
            ) : (
              <p>
                {displayName.charAt(0).toUpperCase() + displayName.slice(1)}{' '}
                hasn't read the daily article yet.
              </p>
            )}
          </div>
          <div className="streak-container">
            <p>Daily Streak: {dailyStreak}</p>
          </div>
        </div>
        <div className="reactions-container">
          <button onClick={handleClick} className="like-btn">
            👍
          </button>
          <span className="likes-count">{`${likes}`}</span>
        </div>
      </div>
    </>
  );
}

export default FeedItem;

// <div className="reactions-container">
//         <svg onClick={handleReactionBtnClick} className="reaction-btn" xmlns="http://www.w3.org/2000/svg" width="50" height="50">
//   <rect width="50" height="50" style={{fill: 'rgb(0,0,255)', strokeWidth:3, stroke: 'rgb(0,0,0)'}} />
// </svg>
//           {/* <svg
//             onClick={handleReactionBtnClick}
//             className="reaction-btn"
//             xmlns="http://www.w3.org/2000/svg"
//             width="200"
//             height="200"
//             viewBox="0 0 24 24"
//           >
//             <path
//               fill="currentColor"
//               d="M12 12Zm0 10q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q1.075 0 2.075.213T16 2.825v2.25q-.875-.5-1.888-.788T12 4Q8.675 4 6.337 6.337T4 12q0 3.325 2.337 5.663T12 20q3.325 0 5.663-2.337T20 12q0-.8-.163-1.55T19.4 9h2.15q.225.725.338 1.463T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm8-17h-1q-.425 0-.713-.288T18 4q0-.425.288-.713T19 3h1V2q0-.425.288-.713T21 1q.425 0 .713.288T22 2v1h1q.425 0 .713.288T24 4q0 .425-.288.713T23 5h-1v1q0 .425-.288.713T21 7q-.425 0-.713-.288T20 6V5Zm-4.5 6q.625 0 1.063-.438T17 9.5q0-.625-.438-1.063T15.5 8q-.625 0-1.063.438T14 9.5q0 .625.438 1.063T15.5 11Zm-7 0q.625 0 1.063-.438T10 9.5q0-.625-.438-1.063T8.5 8q-.625 0-1.063.438T7 9.5q0 .625.438 1.063T8.5 11Zm3.5 6.5q1.45 0 2.675-.7t1.975-1.9q.15-.3-.025-.6T16.1 14H7.9q-.35 0-.525.3t-.025.6q.75 1.2 1.988 1.9t2.662.7Z"
//             />

//           </svg> */}
//         </div>
