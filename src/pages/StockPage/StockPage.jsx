import Header from "../../components/Header/Header";
import React from 'react'
import "./StockPage.scss"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import StockChart from "../../components/StockChart/StockChart"

export default function StockPage() {

    const { symbol } = useParams();

    const [compResults, setCompResults] = useState({});
    
    
    useEffect(() => {
        axios
        .get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=W6N24QP7CIY7T9UW`)
        .then(res => {
            setCompResults(res.data);
            console.log(res.data)
        })
    
    }, [symbol]);

    return (
        <>
        <Header />
        
        <div>
            {/* <StockChart symbol={symbol} /> */}
        </div> 
        <div>
            <h2>{compResults.Name}</h2>
            <p>{compResults.Description}</p>
            <table>
                <tr>
                    <td><strong>Symbol</strong></td>
                    <td>{compResults.Symbol}</td>
                </tr>
                <tr>
                    <td><strong>Asset Type</strong></td>
                    <td>{compResults.AssetType}</td>
                </tr>
                <tr>
                    <td><strong>Exchange</strong></td>
                    <td>{compResults.Exchange}</td>
                </tr>
                <tr>
                    <td><strong>Sector</strong></td>
                    <td>{compResults.Sector}</td>
                </tr>
                <tr>
                    <td><strong>Industry</strong></td>
                    <td>{compResults.Industry}</td>
                </tr>
                <tr>
                    <td><strong>Address</strong></td>
                    <td>{compResults.Address}</td>
                </tr>
                <tr>
                    <td><strong>Market Capitalization</strong></td>
                    <td>{compResults.MarketCapitalization}</td>
                </tr>
                <tr>
                    <td><strong>PE Ratio</strong></td>
                    <td>{compResults.PERatio}</td>
                </tr>
                <tr>
                    <td><strong>PEG Ratio</strong></td>
                    <td>{compResults.PEGRatio}</td>
                </tr>
                <tr>
                    <td><strong>Dividend Per Share</strong></td>
                    <td>{compResults.DividendPerShare}</td>
                </tr>
                <tr>
                    <td><strong>Dividend Yield</strong></td>
                    <td>{compResults.DividendYield}</td>
                </tr>
                <tr>
                    <td><strong>Revenue TTM</strong></td>
                    <td>{compResults.RevenueTTM}</td>
                </tr>
                <tr>
                    <td><strong>Profit Margin</strong></td>
                    <td>{compResults.ProfitMargin}</td>
                </tr>
                <tr>
                    <td><strong>Operating Margin TTM</strong></td>
                    <td>{compResults.OperatingMarginTTM}</td>
                </tr>
                <tr>
                    <td><strong>Return On Assets TTM</strong></td>
                    <td>{compResults.ReturnOnAssetsTTM}</td>
                </tr>
                <tr>
                    <td><strong>Return On Equity TTM</strong></td>
                    <td>{compResults.ReturnOnEquityTTM}</td>
                </tr>
                <tr>
                    <td><strong>Analyst Target Price</strong></td>
                    <td>{compResults.AnalystTargetPrice}</td>
                </tr>
                <tr>
                    <td><strong>Trailing PE</strong></td>
                    <td>{compResults.TrailingPE}</td>
                </tr>
                <tr>
                    <td><strong>Forward PE</strong></td>
                    <td>{compResults.ForwardPE}</td>
                </tr>
                <tr>
                    <td><strong>Price To Sales Ratio TTM</strong></td>
                    <td>{compResults.PriceToSalesRatioTTM}</td>
                </tr>
                <tr>
                    <td><strong>Price To Book Ratio</strong></td>
                    <td>{compResults.PriceToBookRatio}</td>
                </tr>
            </table>
        </div> 
        
        </>
    );
}
