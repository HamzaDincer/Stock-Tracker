import React from 'react'
import "./StockPage.scss"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import StockChart from "../../components/StockChart/StockChart"

export default function StockPage() {

    const symbol = useParams();

    
    
    useEffect(() => {
    
    }, [symbol]);

    return (
        <div>
            <StockChart symbol={symbol} />
        </div>
    );
}
