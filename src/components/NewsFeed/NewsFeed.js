import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsFeed.scss';
const api = "966f46836b374e6bb35c94f4f733b514";

const NewsFeed = ({ symbol }) => {
    const [articles, setArticles] = useState([]);
  
    useEffect(() => {
        const fetchNews = async () => {
          try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${symbol}&apiKey=966f46836b374e6bb35c94f4f733b514`);
            setArticles(response.data.articles);
          } catch (error) {
            console.error(`Error fetching news articles for ${symbol}:`, error);
          }
        };
        fetchNews();
    }, [symbol]);
  
    return (
        <div className="news-feed">
            <h3>Latest News</h3>
            {articles.slice(0, 3).map((article, index) => (
            <div key={index} className="news-article">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h4>{article.title}</h4>
                </a>
                <p>{article.description}</p>
                <span>{new Date(article.publishedAt).toLocaleString()}</span>
            </div>
            ))}
        </div>
        );
    
  };
  
  export default NewsFeed;