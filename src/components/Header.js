import { useState } from "react";
import { Link } from "react-router-dom";

const Title = () => (
    <a href="/"><img className="logo" src="https://yt3.ggpht.com/ytc/AKedOLSpK3T_2RxkMYb-pk9oENQB0NvYpeOdXRgQe8i5=s800-c-k-c0x00ffffff-no-rj" alt="Food Villa" /></a>
);

//Composing Components
const Header = () =>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="header">
            <Title />
            <div className="nav-items">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>Cart</li>
                    <li>
                        {
                            (isLoggedIn ? (
                            <button className="login-btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
                            ): (
                            <button className="login-btn" onClick={() => setIsLoggedIn(true)}>Login</button>)
                            )
                        }
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;