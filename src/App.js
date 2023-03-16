import Header from "./components/Header/Header";
import HomePage from './pages/HomePage/HomePage';
import StockPage from './pages/StockPage/StockPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import './App.scss';

function App() {
  return(
  <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/:id" element={<StockPage />}/>
      </Routes>
  </BrowserRouter>
  ) 
}
export default App;
