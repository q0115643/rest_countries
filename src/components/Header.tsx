import React from 'react';
import { NavLink } from 'react-router-dom';
import site from 'config.yml';
import earth from 'assets/earth.png';


const Header: React.FC<{}> = () => (
    <div className="header-wrap main-pad">
        <div className="header-left">
            <a href="/" className="home-link">
                <div className="logo-wrap">
                    <img className="icon earth" alt="earth" src={ earth } />
                </div>
                <div className="title-wrap">
                    <span className="title">
                        { site.title }
                    </span>
                </div>
            </a>
        </div>
        <div className="header-right">
            <NavLink
                to="/about"
                className="about-link"
                activeClassName="about-link-active"
            >
                <span className="about-text">
                        About
                </span>
            </NavLink>
        </div>
    </div>
);

export default Header;
