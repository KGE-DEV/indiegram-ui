import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './Header.scss';
import logo from './img/logo2.png';

class Header extends Component {

    render() {
        return (
            <section className="header container">
                <Link to="/">
                    <img className="header__logo" src={logo} alt="logo" />
                </Link>
            </section>
            
        )
    }
}

export default Header;