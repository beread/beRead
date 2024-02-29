import React from 'react';
import { useState, useEffect } from 'react';

const ArticleModal = ({
  setIsModalOpened,
  article,
  setReadTimes,
  readTimes,
  username,
  archive,
  setArchive,
  setDailyStreak,
  dailyStreak
}) => {
  const [contentText, setContentText] = useState('');
  const contentUrl = 'https://en.wikipedia.org/wiki/Polar_bear';

  // Logic for when user clicks x (no back end logic here, user isn't finished reading)
  const handleModalXBtn = () => {
    console.log('hanle modal x button!');
    setIsModalOpened(false);
    if (!archive) {
      const tempReadTimes = readTimes;
      tempReadTimes.push(Date.now());
      setReadTimes(tempReadTimes);
    } else {
      setArchive(false);
    }
  };

  // Logic for when user is done reading article (some back end logic here)
  const handleDoneReadingBtn = async () => {
    console.log('handle done reading button!');
    const URL = 'http://localhost:3000/api/read/';

    setIsModalOpened(false);
    if (!archive) {
      const timeFinished = Date.now();

      const lastOpen = readTimes[readTimes.length - 1];

      let timeSpent = 0;

      for (let i = 0; i < readTimes.length - 1; i += 2) {
        const openTime = readTimes[i];
        const closeTime = readTimes[i + 1];
        timeSpent += closeTime - openTime;
      }

      timeSpent += timeFinished - lastOpen;
      timeSpent = Math.floor(timeSpent / 60000); // Convert milliseconds to minutes

      try {
        await fetch(URL + 'readDailyArticle/' + username, { method: 'PATCH' });
        await fetch(URL + 'updateTimeFinished/' + username, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ timeFinished: timeFinished }),
        });
        await fetch(URL + 'updateTimeSpent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: username, timeSpent: timeSpent }),
        });
      } catch {
        console.log('Error in read button');
      }

      setReadTimes([]);
      setDailyStreak(dailyStreak + 1);
    } else {
      setArchive(false);
    }
  };

  // const contentUrl = article.content_urls.desktop.page

  return (
    <div className="article-modal-container">
      <div className="article-modal-contents">
        <div className="modal-title-container">
          <h1 className="modal-title">{article.article.titles.normalized}</h1>
          <svg
            onClick={handleModalXBtn}
            className="modal-x-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M18 6L6 18M6 6l12 12"
            />
          </svg>
        </div>
        <p className="article-body-text">
          {article.text}
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illum architecto maxime cupiditate, quibusdam voluptates provident id reprehenderit eius, quisquam veniam ipsam laborum sequi distinctio soluta velit perspiciatis. Minus, pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illum architecto maxime cupiditate, quibusdam voluptates provident id reprehenderit eius, quisquam veniam ipsam laborum sequi distinctio soluta velit perspiciatis. Minus, pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illum architecto maxime cupiditate, quibusdam voluptates provident id reprehenderit eius, quisquam veniam ipsam laborum sequi distinctio soluta velit perspiciatis. Minus, pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illum architecto maxime cupiditate, quibusdam voluptates provident id reprehenderit eius, quisquam veniam ipsam laborum sequi distinctio soluta velit perspiciatis. Minus, pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illum architecto maxime cupiditate, quibusdam voluptates provident id reprehenderit eius, quisquam veniam ipsam laborum sequi distinctio soluta velit perspiciatis. Minus, pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illum architecto maxime cupiditate, quibusdam voluptates provident id reprehenderit eius, quisquam veniam ipsam laborum sequi distinctio soluta velit perspiciatis. Minus, pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illum architecto maxime cupiditate, quibusdam voluptates provident id reprehenderit eius, quisquam veniam ipsam laborum sequi distinctio soluta velit perspiciatis. Minus, pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illum architecto maxime cupiditate, quibusdam voluptates provident id reprehenderit eius, quisquam veniam ipsam laborum sequi distinctio soluta velit perspiciatis. Minus, pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. */}
        </p>
      </div>
      <div className="article-modal-button">
        <a className="done-reading-btn" onClick={handleDoneReadingBtn}>
          I'm Done
        </a>
      </div>
    </div>
  );
};

export default ArticleModal;

// const [contentText, setContentText] = useState('');

//   useEffect(() => {
//     const fetchContentText = async () => {
//       try {
//         const response = await fetch(article.content_urls.desktop.page);
//         const data = await response.text();
//         setContentText(data);
//       } catch (error) {
//         console.error('Error fetching content text:', error);
//       }
//     };

//     fetchContentText();
//   }, [article.content_urls.desktop.page]);

//   // Logic for when user clicks x (no back end logic here, user isn't finished reading)
//   const handleModalXBtn = () => {
//     console.log('handle modal x button!');
//     setIsModalOpened(false);
//   };

//   // Logic for when user is done reading article (some back end logic here)
//   const handleDoneReadingBtn = () => {
//     console.log('handle done reading button!');
//     setIsModalOpened(false);
//   };

//   return (
//     <div className="article-modal-container">
//       <div className="article-modal-contents">
//         <div className="modal-title-container">
//           <h1 className="modal-title">Article Title</h1>
//           <svg
//             onClick={handleModalXBtn}
//             className="modal-x-icon"
//             xmlns="http://www.w3.org/2000/svg"
//             width="200"
//             height="200"
//             viewBox="0 0 24 24"
//           >
//             <path
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M18 6L6 18M6 6l12 12"
//             />
//           </svg>
//         </div>
//         <p className="article-body-text">{contentText}</p>
//       </div>
//       <div className="article-modal-button">
//         <a className="done-reading-btn" onClick={handleDoneReadingBtn}>
//           I'm Done
//         </a>
//       </div>
//     </div>
//   );
// };

// export default ArticleModal;
