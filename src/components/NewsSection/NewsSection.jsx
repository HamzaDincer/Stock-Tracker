import React from 'react'
import NewsCard from '../NewsCard/NewsCard';

export default function NewSection({newsData}) {
  console.log(newsData)
  const newsCards = newsData.map((newCard, i) => {
    return (
        <NewsCard
          key={i}
            author={newCard.authors}
            title={newCard.title}
            image={newCard.image}
            url={newCard.url}
            ticker_sentiment={newCard.ticker_sentiment}
            overall_sentiment_label={newCard.overall_sentiment_label}
            overall_sentiment_score={newCard.overall_sentiment_score}
            source={newCard.source}
            source_domain={newCard.source_domain}
            summary={newCard.summary}
            isEven={i % 2 === 0 }
            />
    );
  });

  return (
    <div className='news-card'>
        {newsCards}
    </div>
  )
}
