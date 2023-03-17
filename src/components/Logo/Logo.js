import { Link } from "react-router-dom";
import logo from "../../assets/images/stock-logo.jpeg";
import "./Logo.scss";

const Logo = () => {

    return (
    <Link to={"/"} className="header__link">
        <img src={logo} alt="Stock-Tracker logo" className="header__logo" /> 
    </Link>
    )
};
export default Logo;