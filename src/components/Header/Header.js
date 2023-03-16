import "./Header.scss";
import Logo from "../Logo/Logo"
import SearchBar from "../SearchBar/SearchBar"
import axios from "axios";

const Header = () => {
    
    return (
    <header className="header">
        <Logo />
        <SearchBar />
    </header>
    )
};


export default Header;