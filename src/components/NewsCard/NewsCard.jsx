import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NewsCard({ author, title, image, url, ticker_sentiment, overall_sentiment_label, overall_sentiment_score, source, source_domain, summary, isEven }) {
  const [showSummary, setShowSummary] = useState(false);

  const {ticker, relevance_score, ticker_sentiment_score, ticker_sentiment_label} = ticker_sentiment;

  const handleMouseEnter = () => setShowSummary(true);
  const handleMouseLeave = () => setShowSummary(false);
  const newsCardClasses = `news-card${isEven ? ' news-card--even' : ''}`;

  return (
    <div className={newsCardClasses}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to={url}>

        <h3 className="news-card__title">{title}</h3>
      </Link>
      <div className="news-card__info">
        <span className="news-card__author">{author}</span>
        <span className="news-card__source">{source} ({source_domain})</span>
        <span className="news-card__ticker-sentiment">Ticker: {ticker}, Relevance Score: {relevance_score}, Sentiment Score: {ticker_sentiment_score}, Sentiment Label: {ticker_sentiment_label}</span>
        <span className="news-card__overall-sentiment">Overall Sentiment: {overall_sentiment_label} ({overall_sentiment_score})</span>
      </div>
      {showSummary && (
        <p className="news-card__summary">{summary}</p>
      )}
    </div>
  );
}

export default NewsCard;
