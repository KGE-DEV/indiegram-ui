import React, {Component} from 'react';

import moment from 'moment';

import "./Footer.scss";

class Footer extends Component {

    getCurrentYear() {
        return moment().year();
    }
    render() {
        return (
            <div className='footer'>
                <p>Copyright © {this.getCurrentYear()} <a href="http://garrettestrin.com/" target="_blank" rel="noopener noreferrer"> Garrettestrin.com </a></p>
            </div>
        )
    }
}

export default Footer;