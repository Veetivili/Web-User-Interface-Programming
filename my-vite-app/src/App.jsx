import React, { useEffect, useState } from 'react';
import './App.css';

function NewsComponent() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/.netlify/functions/fetch-nytimes');
        const data = await response.json();
        setArticles(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Failed fetching news:", error);
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  function readArticle(articleId) {
    // Redirecting to the netlify function with the article ID as a parameter
    window.location.href = `/.netlify/functions/redirect-to-article?articleId=${articleId}`;
}

  if (loading) return <div className='loading'>Loading...</div>;

  return (
    <div className='center'>
    <div className='container'>
      {articles.map(article => (
        <div className='article' key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.abstract}</p>
          <img src={article.media[0]?.['media-metadata'][2]?.url} alt={article.title} />
          <button onClick={() => readArticle(article.id)}>Read Article</button>
        </div>
      ))}
    </div>
    </div>
  );
}

export default NewsComponent;
