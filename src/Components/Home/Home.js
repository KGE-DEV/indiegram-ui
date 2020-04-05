import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

import "./Home.scss";

class Home extends Component {
    render() {
        let {userRole} = this.props;
        if(userRole && userRole !== "unauthorized") {
            return <Redirect to="/feed/1" />;
        }
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