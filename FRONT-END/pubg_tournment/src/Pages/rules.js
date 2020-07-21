import React from 'react';

import './rules.css';
import Video from '../img/video.mp4';
import Video2 from '../img/video.webm';

const Rules2 = () => {
    return (
        <div>
            <section className="section-stories">
                <div className="bg-video"> 
                    <video className="bg-video__content" autoPlay muted loop>
                            <source src={Video} type="video/mp4" />
                            <source src={Video2} type="video/webm" />
                                Your browser is not supported
                    </video>
                </div>
            <div className="u-centered-text u-margin-bottom-big">
                        <h2 className="heading-secondary">
                            Rules and regulations
                        </h2>
                    </div>
                    <div className="row">
                        <div className="story">
                        <div className="story__text">
                                <p>
                                    Rule 1
                                </p>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="story">
                        <div className="story__text">
                                <p>
                                   rule 2
                                </p>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="story">
                        <div className="story__text">
                                <p>
                                    Rule 3
                                </p>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="story">
                        <div className="story__text">
                                <p>
                                    rule 4
                                </p>
                            </div>
                        </div>
                        </div>
            </section>
        </div>
    );
}

export default Rules2;