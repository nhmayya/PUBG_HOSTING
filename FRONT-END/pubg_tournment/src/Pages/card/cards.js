import React from 'react';

import './cards.css';

const cards = () => {
    return(
        <section className="section-tours">
                <div className="u-centered-text u-margin-bottom-big">
                    <h2 className="heading-secondary">
                        Most popular maps
                    </h2>
                </div>

                <div className="row">
                    <div className="col-1-of-3">
                        <div className="card">
                            <div className="card__side card__side--front">
                                <div className="card__picture card__picture--1">
                                    
                                </div>
                                <h4 className="card__heading">
                                    <span className="card__heading-span card__heading-span--1">
                                        Erangel
                                    </span>
                                    
                                </h4>
                                <div className="card__details">
                                   <ul>
                                       <li>Classic</li>
                                       <li>tpp or fpp</li>
                                       <li>20 mins</li>
                                       <li>Adventures</li>
                                       <li>squad</li>
                                   </ul>
                                </div>
                            </div>
                            <div className="card__side card__side--back card__side--back--1">
                                <div className="card__cta">
                                    <div className="card__price-box">
                                        <p className="card__price-only">only</p>
                                        <p className="card__price-value">₹10</p>
                                    </div>
                                    <a href="#popup" className="btn btn--white">REGister now</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-1-of-3">
                        <div className="card">
                            <div className="card__side card__side--front">
                                <div className="card__picture card__picture--2">
                                    
                                </div>
                                <h4 className="card__heading">
                                    <span className="card__heading-span card__heading-span--2">
                                        Miramar
                                    </span>
                                    
                                </h4>
                                <div className="card__details">
                                   <ul>
                                   <li>Classic</li>
                                       <li>tpp or fpp</li>
                                       <li>35-40 mins</li>
                                       <li>Adventures</li>
                                       <li>squad</li>
                                   </ul>
                                </div>
                            </div>
                            <div className="card__side card__side--back card__side--back--2">
                                <div className="card__cta">
                                    <div className="card__price-box">
                                        <p className="card__price-only">only</p>
                                        <p className="card__price-value">₹10</p>
                                    </div>
                                    <a href="#popup" className="btn btn--white">REGister now</a>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-1-of-3">
                        <div className="card">
                            <div className="card__side card__side--front">
                                <div className="card__picture card__picture--3">
                                    
                                </div>
                                <h4 className="card__heading">
                                    <span className="card__heading-span card__heading-span--3">
                                        Sanhok
                                    </span>
                                    
                                </h4>
                                <div className="card__details">
                                   <ul>
                                   <li>Classic</li>
                                       <li>tpp or fpp</li>
                                       <li>20 mins</li>
                                       <li>Adventures</li>
                                       <li>squad</li>
                                   </ul>
                                </div>
                            </div>
                            <div className="card__side card__side--back card__side--back--3">
                                <div className="card__cta">
                                    <div className="card__price-box">
                                        <p className="card__price-only">only</p>
                                        <p className="card__price-value">₹10</p>
                                    </div>
                                        <a href="#popup" className="btn btn--white">REGister now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="u-centered-text u-margin-top-huge">
                        <a href="#" className="btn btn--green">Discover all matches</a>
                    </div> 
                </section>
    );
}

export default cards;