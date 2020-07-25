import React from 'react';
import {Link} from 'react-router-dom'

import './nav.css';

const nav = () => {
    return(
        <div className="navigation">
            <input type="checkbox" className="navigation__checkbox" id="nav-tog" />

            <label htmlFor="nav-tog" className="navigation__button">
                <span className="navigation__icon">&nbsp;</span>
            </label>

            <div className="navigation__background">&nbsp;</div>

            <nav className="navigation__nav">
                <ul className="navigation__list">
                    <li className="navigation__item"><Link to="/" className="navigation__link"><span>01</span>home</Link></li>
                    <li className="navigation__item"><Link to="/rules" className="navigation__link"><span>02</span>rules</Link></li>
                    <li className="navigation__item">
                        <Link to='/find' className="navigation__link">
                            <span>03</span>find
                            </Link>
                            </li>
                    <li className="navigation__item"><Link to='/about' className="navigation__link"><span>04</span>about</Link></li>
                    <li className="navigation__item"><Link to="/login" className="navigation__link"><span>05</span>Login</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default nav;