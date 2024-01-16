import './styles/Header.css'
import main_logo from './img/main_logo.svg'
import { Link, NavLink } from "react-router-dom";

const Header = () => {

    return(
        <div className='header_app'>
            <Link className='link' to="/" > 
                <div className="left_side">
                    <img className='logo' src={main_logo} alt="" />
                    <h1 className="app_name">Dark Weather</h1>
                </div>
            </Link>
           
            <div className="right_side">
                <ul>
                    <NavLink className={({ isActive }) => isActive ? "link text_shadow" : "link"} 
                    to="/" >
                        <li><a>Today</a></li></NavLink>
                    {/* <Link className='link' to='/description'><li><a>Details</a></li></Link> */}
                    <NavLink className={({ isActive }) => isActive ? "link text_shadow" : "link"}  to='/month'><li><a>Weakly Forecast</a></li></NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Header