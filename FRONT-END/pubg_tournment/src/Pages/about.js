import React from 'react';
import { Link } from 'react-router-dom';

import Img from '../img/logo-white.png';
import './about.css';

const about = () => {

    return (
    <footer className="footer">
                <div className="footer__logo-box">
                    <img src={Img} alt="Main logo" className="footer__logo" />
                </div>

                        <p className="footer__copyright">
                            Built by <Link className="footer__link">Anudeep Marathe </Link>, <Link className="footer__link">Charith R.C</Link>, <Link className="footer__link">Dattha Prasad</Link>,<Link className="footer__link"> Harinandan Mayya </Link> for the practice purpose. This is designed using <Link className="footer__link">MERN</Link> concepts. References- Jonas Schmedtmann.
                            <h6>Contact us:</h6><Link className="footer__link">example-email@gmail.com </Link></p>

                            
                            
            </footer> 
            );
};

export default about;