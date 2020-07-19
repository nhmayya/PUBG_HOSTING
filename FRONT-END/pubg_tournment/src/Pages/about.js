import React from 'react';

import Img from '../img/logo-white.png';
import './about.css';

const about = () => {

    return (
    <footer className="footer">
                <div className="footer__logo-box">
                    <img src={Img} alt="Main logo" className="footer__logo" />
                </div>

                        <p className="footer__copyright">
                            Built by <a href="#" className="footer__link">Anudeep Marathe </a>, <a href="#" className="footer__link">Charith R.C</a>, <a href="#" className="footer__link">Dattha Prasad</a>,<a href="#" className="footer__link"> Harinandan Mayya </a> for the practice purpose. This is designed using <a href="#" className="footer__link">MERN</a> concepts. References- Jonas Schmedtmann.
                            <h6>Contact us:</h6><a href="#" className="footer__link">example-email@gmail.com </a></p>

                            
                            
            </footer> 
            );
};

export default about;