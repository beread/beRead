import React from 'react';
import ArticleModal from './ArticleModal';
import { useState } from 'react';
import '../styles.css'; 

const ArchiveItem = ({ article }) => {
  const [isModalOpen, setIsModalOpened] = useState(false);
  const [archive, setArchive] = useState(false)
  const { title, description, createdAt } = article;

  const formattedDate = new Date(createdAt).toLocaleDateString();

  const handleModalToggle = () => {
    console.log('handle modal toggle hit', isModalOpen);
    setIsModalOpened(!isModalOpen);
    setArchive(true)
  };

  return (
    <div className='archive-item'>
      <h2
        onClick={handleModalToggle}
      >
        {article.article.titles.normalized}{' '}
      </h2>
      <p>Date: {formattedDate}</p>
      <p>Summary: {description}</p>
      {isModalOpen && (
        <ArticleModal
          isModalOpen={isModalOpen}
          setIsModalOpened={setIsModalOpened}
          article={article}
          archive = {archive}
          setArchive = {setArchive}
        />
      )}
    </div>
  );
};

export default ArchiveItem;
