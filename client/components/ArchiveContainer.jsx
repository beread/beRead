import React, { useEffect, useState } from 'react';
import ArchiveItem from './ArchiveItem.jsx';

const ArchiveContainer = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles from the database
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/article/getArchive'
        );
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Archive</h1>
      {articles.map((entry) => (
        <ArchiveItem key={entry.id} article={entry.article} />
      ))}
    </div>
  );
};

export default ArchiveContainer;
