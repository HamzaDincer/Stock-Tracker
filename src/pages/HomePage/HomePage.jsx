import React, { useEffect, useState } from 'react';
import "./HomePage.scss";
import axios from 'axios';
import StockChart from "../../components/StockCard/StockCard"

export default function HomePage() {

    const [newsData, setNewsData] = useState({});
    const [qqqData, setQQQData] = useState({});
    const [spyData, setSpyData] = useState({});

    const apiKey = process.env.REACT_APP_API_KEY;
    
    const fetchMarketNews = async () => {
        try {
            const response = await axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${apiKey}`);
            console.log(response.data)
            setNewsData(response.data);        
        } catch (e) {
            console.error('Error 404: Fetching Market News:', e);
        }
    };
    
    const fetchTicker = async ({ticker}) => {
        try {
            const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=15min&apikey=${apiKey}`);
            console.log(response.data)
            return response.data      
        } catch (e) {
            console.error('Error 404: Fetching Market News:', e);
        }
    };
    
    useEffect(() => {
        fetchMarketNews();
        Promise.all([fetchTicker({ ticker: "QQQ" }), fetchTicker({ ticker: "SPY" })])
            .then(([qqqData, spyData]) => {
                setQQQData(qqqData);
                setSpyData(spyData);
            })
            .catch((error) => {
                console.error('Error fetching tickers:', error);
            });
    }, []);
    

    return (
        <div className='home-page'>
            <StockChart symbol={"SPY"} timeSeriesData={spyData.data?.['Time Series (15min)']} />
            <StockChart symbol={"QQQ"} timeSeriesData={qqqData.data?.['Time Series (15min)']} />
        </div>
    )
}
