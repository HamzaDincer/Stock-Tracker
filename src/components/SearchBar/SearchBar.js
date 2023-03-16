import "./SearchBar.scss";
import { useState, useRef } from "react";
import axios from "axios";

const SearchBar = () => {

  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef();

  const handleSearch = (event) => {
    event.preventDefault();
    const inputValue = inputRef.current.value;
    axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=AL6W744S27CFJPR5`
      )
      .then((response) => {
        setSearchResults(response.data.bestMatches);
        console.log(response.data.bestMatches[0]);
        setShowResults(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleResultClick = (symbol) => {
    console.log(`Selected symbol: ${symbol}`);
    setShowResults(false);
    inputRef.current.value = symbol;
  };

  return (
    <div className="header__search-container">
      <form className="header__form" onChange={handleSearch}>
        <input
          type="search"
          placeholder="Search"
          className="header__search"
          ref={inputRef}
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        ></input>
        {showResults && (
          <ul className="header__search-results">
            {searchResults && searchResults.map((result) => (
              <li
                key={result["1. symbol"]}
                onClick={() => handleResultClick(result.symbol)}
              >
                {result["1. symbol"]} - {result["2. name"]}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
