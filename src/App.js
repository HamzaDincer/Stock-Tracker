import Header from "./components/Header/Header";
import HomePage from './pages/HomePage/HomePage';
import StockPage from './pages/StockPage/StockPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import './App.scss';

function App() {
  return(
        <BrowserRouter >
                <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/:symbol" element={<StockPage />}/>
        </Routes>
    </BrowserRouter>
  ) 
}
export default App;
