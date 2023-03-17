import Header from "../../components/Header/Header";
import React, { useEffect, useState } from 'react';
import "./HomePage.scss";
import { fetchMarketNews } from "../../api"
import axios from 'axios';

export default function HomePage() {

    const [newsData, setNewsData] = useState({});

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
    
    
    
    



    useEffect(() => {
        fetchMarketNews();
        console.log(newsData)
    }, []);
    

    return (
        <>
        <Header />
        <div className='home-page'>
        </div>
        </>
    )
}

