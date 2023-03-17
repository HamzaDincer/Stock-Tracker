import React, { useEffect, useState } from 'react';
import "./HomePage.scss";
import axios from 'axios';
import StockChart from "../../components/StockChart/StockChart"

export default function HomePage() {

    const [newsData, setNewsData] = useState(null);
    const [qqqData, setQQQData] = useState(null);
    const [spyData, setSpyData] = useState(null);

    const apiKey = process.env.REACT_APP_API_KEY;
    
    const fetchMarketNews = async () => {
        try {
            const response = await axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${apiKey}`);
            setNewsData(response.data);        
        } catch (e) {
            console.error('Error 404: Fetching Market News:', e);
        }
    };
    
    const handleApiResponse = (data, ticker) => {
        if (data.hasOwnProperty("Note")) {
          console.log(`API call frequency exceeded for ${ticker}. Please try again later.`, data);
          return false;
        } else {
          return data['Time Series (15min)'];
        }
      };

      const fetchTicker = async ({ ticker }) => {
        try {
          const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=15min&adjusted=true&outputsize=compact&datatype=json&start_time=09:30:00&end_time=14:00:00&apikey=${apiKey}`);
          return response.data;
        } catch (e) {
          console.error(`Error 404: Fetching Market Data for ${ticker}:`, e);
        }
      };
      
      useEffect(() => {
        fetchMarketNews();
        Promise.all([fetchTicker({ ticker: "QQQ" }), fetchTicker({ ticker: "SPY" })])
          .then(([qqqData, spyData]) => {
            const qqqTimeSeries = handleApiResponse(qqqData, "QQQ");
            const spyTimeSeries = handleApiResponse(spyData, "SPY");
      
            if (qqqTimeSeries) {
              setQQQData(qqqTimeSeries);
              // console.log(qqqTimeSeries);
            }
      
            if (spyTimeSeries) {
              setSpyData(spyTimeSeries);
              console.log(spyTimeSeries);
            }
          })
          .catch((error) => {
            console.error("Error fetching tickers:", error);
          });
      }, []);
      
      
    
    if (qqqData === null || spyData === null || newsData === null) {
        return <p>Loading</p>
    }

    return (
        <div className='home-page'>
            <StockChart symbol={"SPY"} timeSeriesData={spyData} />
            <StockChart symbol={"QQQ"} timeSeriesData={qqqData} />
        </div>
    )
}
