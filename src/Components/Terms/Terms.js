import React, {Component} from 'react';

import {Redirect, Link} from 'react-router-dom';
import './Terms.scss';

class Terms extends Component {
    render() {
        let {role} = this.props;
        if(typeof(role) != "undefined") {
            return (
                <Redirect to="/" />
            )
        }

        return (
            <div className="container terms">
                <p className="terms__text">
                    We ask that no photos of Indie to be posted on any social media platform. We thank you for your agreement and understanding. 
                </p>
                <p className="terms__text">
                    By clicking agree below, you accept these terms.
                </p>
                <Link to="invite"><button className="login__submit">Agree</button></Link>
            </div>
        )
    }
}

export default Terms;