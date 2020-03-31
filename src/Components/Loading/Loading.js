import React, {Component} from 'react';

import './Loading.scss';
import loadingImg from './assets/img/loading.jpg';

class Loading extends Component {
    render() {
        let loadingStyle = {
            backgroundImage: 'url(' + loadingImg + ')',
        }
        return (
            <div className="loading container">
                <div className="loading__icon" style={loadingStyle}></div>
                {/* <img src={loadingImg} alt="loading"/> */}
                <p className="loading__text">Loading...</p>
            </div>
        )
    }
}

export default Loading;