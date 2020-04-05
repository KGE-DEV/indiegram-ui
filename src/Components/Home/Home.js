import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import "./Home.scss";

class Home extends Component {
    render() {
        return (
            <div className="container home">
                <p className="home__link">
                    <Link to="/login">LOGIN</Link>
                </p>
                <p className="home__link">
                    <Link to="/invite">REQUEST INVITATION</Link>
                </p> 
            </div>
        )
    }
}

export default Home;