import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';

import Loading from '../Loading/Loading.js';

import "./Home.scss";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 1000);
    }
    render() {
        let {userRole} = this.props;
        let {loading} = this.state;
        if(loading) {
            return <Loading />;
        }
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