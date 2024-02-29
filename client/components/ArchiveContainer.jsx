import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ArchiveItem from './ArchiveItem.jsx';

const ArchiveContainer = () => {
  const userData = useSelector((state) => state.auth);

  const [articles, setArticles] = useState([]);
  const [userDataDB, setUserDataDB] = useState([]);
  useEffect(() => {
    // Fetch articles from the database
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/article/getArchive'
        );
        const data = await response.json();

        console.log('data:', data[0]); // data: {id: 1, title: "The Best Article", description: "This is the best article.", createdAt: "2021-10-10T00:00:00.000Z", updatedAt: "2021-10-10T00:00:00.000Z"}
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const username = userData.userData.username;

  useEffect(() => {
    console.log('use effect hit');
    const getUserFeedData = () => {
      fetch(`http://localhost:3000/api/user/${username}`)
        .then((response) => response.json())
        .then((data) => {
          setUserDataDB(data);
        });
    };
    getUserFeedData();
  }, []);

  const archiveItems = articles.map((entry) => (
    <ArchiveItem key={entry.id} article={entry} />
  ));

  if (!userDataDB.readDailyArticle) {
    archiveItems.shift();
  }

  return (
    <div className="archive-container">
      <h1>Archive</h1>
      <div className="archive-items">{archiveItems}</div>
    </div>
  );
};

export default ArchiveContainer;
