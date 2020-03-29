import React, { Component } from 'react';

import './Header.scss';
import logo from './img/logo.png';

class Header extends Component {

    render() {
        return (
            <section className="header container">
                <a href="/">
                    <img className="header__logo" src={logo} alt="logo" />
                </a>
            </section>
            
        )
    }
}

export default Header;