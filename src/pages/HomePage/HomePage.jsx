import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../../components/Header/Header";
import StockChart from "../../components/StockChart/StockChart";
import NewsSection from "../../components/NewsSection/NewsSection";
import "./HomePage.scss";

export default function HomePage() {
  const [newsData, setNewsData] = useState(null);
  const [filteredNewsData, setFilteredNewsData] = useState(null);
  const [qqqData, setQQQData] = useState(null);
  const [spyData, setSpyData] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchMarketNews = async () => {
    try {
      const response = await axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&topics=${selectedTopic}&apikey=${apiKey}`);
      setNewsData(response.data);
      setFilteredNewsData(response.data.feed);
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
        }

        if (spyTimeSeries) {
          setSpyData(spyTimeSeries);
        }
      })
      .catch((error) => {
        console.error("Error fetching tickers:", error);
      });
  }, [selectedTopic]);



  const handleTopicChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedValue)
    setSelectedTopic(selectedValue)
  };

  if (qqqData === null || spyData === null || filteredNewsData === null) {
    return <p>Loading</p>
  }

  return (
    <>
      <Header />
      <div className='home-page'>
      <p className="text-center">SPY</p>
        <StockChart symbol={"SPY"} timeSeriesData={spyData} />
        <br />
        <p className="text-center">QQQ</p>
        <StockChart symbol={"QQQ"} timeSeriesData={qqqData} />
        
        <br />
        {newsData && (
          <>
            <div className="row">
              <div  className="row__child">
                <div onClick={() => setSelectedTopic("")}>All</div>
                <div onClick={() => setSelectedTopic("financial_markets")}>Financial Markets</div>
                <div onClick={() => setSelectedTopic("technology")}>Technology</div>
                <div onClick={() => setSelectedTopic("real_estate")}>Real Estate</div>
                <div onClick={() => setSelectedTopic("blockchain")}>Blockchain</div>
              </div>
              <NewsSection newsData={filteredNewsData} selectedTopic = {selectedTopic} />
            </div>

          </>
        )}
      </div>
    </>
  )
}
