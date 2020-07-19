import React, { useEffect } from 'react';

import Logo from '../img/logo-white.png';
import './home.css';

const Home=props=>{
    useEffect(()=>{
        document.body.style.backgroundImage='url(null)';
        document.body.style.backgroundColor='black'
    })
    return(
        
        <header className="header" >
            <div className="header__logo-box">
                <img src={Logo} alt="Logo" className="header__logo"/>
            </div>
            <div className="header__text-box">
                <h1 className="heading-primary">
                    <span className="heading-primary--main">pubg</span>
                    <span className="heading-primary--sub">Let the opponent byte the dust</span>
                </h1>

                <a href="/register" className="btn btn--white btn--animation">register now</a>
            </div>
        </header>
    )
}

export default Home;