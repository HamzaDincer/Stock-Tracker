import "./Header.scss";
import Logo from "../Logo/Logo"
import Search from "../Search/Search"

const Header = () => {
    
    return (
    <header className="header">
        <Logo />
        <Search />
    </header>
    )
};


export default Header;