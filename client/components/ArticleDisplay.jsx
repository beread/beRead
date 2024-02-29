import React, { useEffect, useState } from "react";

function ArticleDisplay() {
  const [articleOfTheDay, setArticleOfTheDay] = useState({});
  const [articleTitle, setArticleTitle] = useState("");
  const [articleImage, setArticleImage] = useState("");
  const [articleDescription, setArticleDescription] = useState("");

  useEffect(() => {
    console.log("use effect hit");
    fetch("http://localhost:3000/api/article/getDailyArticle")
      .then((response) => response.json())
      .then((data) => {
        setArticleOfTheDay(data);
        setArticleTitle(data.article.titles.normalized);
        setArticleImage(data.article.thumbnail.source);
        setArticleDescription(data.article.description);
      })
      .catch((err) => {
        console.log("Error fetching article of the day: ", err);
      });
  }, []);

  const backgroundImageStyle = {
    backgroundImage: `url(${articleImage})`,
    backgroundColor: 'rgba(56, 56, 56, 0.5)',
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "inset 0 0 20px #ffffff",
    color: "black",
  };

  return (
    <div className="article-display-container">
      <div className="article-inner-container">
        <img className="article-image" src={articleImage} />
        <div className="article-details">
          <p className="aotd-body-text">Article of the Day</p>
          <h3 className="aotd-header">{articleTitle.toString().replace('_', ' ')}</h3>
          <p className="aotd-description">{articleDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default ArticleDisplay;
