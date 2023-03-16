import {BrowserRouter, Route, Routes} from 'react-router-dom'

import './App.scss';

function App() {
  return(
  <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />}/>
        <Route path="/:id" element={<StockPage />}/>
      </Routes>
  </BrowserRouter>
  ) ;
}
export default App;
