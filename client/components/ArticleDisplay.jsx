import React, { useEffect, useState } from "react";

function ArticleDisplay() {
  const [isArticleOpen, setIsArticleOpened] = useState(false);
  const [articleOfTheDay, setArticleOfTheDay] = useState({});
  const [articleTitle, setArticleTitle] = useState("");
  const [articleImage, setArticleImage] = useState("");
  const [articleDescription, setArticleDescription] = useState("");

  useEffect(() => {
    console.log("use effect hit");
    fetch("http://localhost:3000/api/article/getDailyArticle")
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        setArticleOfTheDay(data);
        setArticleTitle(data.title);
        setArticleImage(data.article.thumbnail.source);
        setArticleDescription(data.article.description);
      })
      .catch((err) => {
        console.log("Error fetching article of the day: ", err);
      });
  }, []);

  const backgroundImageStyle = {
    backgroundImage: `url(${articleImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "inset 0 0 20px #ffffff",
    color: "black",
  };

  return (
    <div className="article-display-container" style={backgroundImageStyle}>
      <p className="aotd-body-text">Article of the Day</p>
      <h3 className="aotd-header">{articleTitle.replace("_", " ")}</h3>
      <p className="aotd-description">{articleDescription}</p>
    </div>
  );
}

export default ArticleDisplay;
