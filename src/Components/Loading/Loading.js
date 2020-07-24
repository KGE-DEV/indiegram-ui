import React, {Component} from 'react';

import './Loading.scss';
import loadingImg from './assets/img/loading.jpg';

class Loading extends Component {
    render() {
        let { uploadProgress } = this.props;
        
        let loadingStyle = {
            backgroundImage: 'url(' + loadingImg + ')',
        }
        return (
            <div className="loading container">
                <div className="loading__icon" style={loadingStyle}></div>
                {uploadProgress ? <p className="loading__text">{Math.round((uploadProgress.loaded/uploadProgress.total)*100)}% Uploaded</p> : <p className="loading__text">Loading...</p>}
                
            </div>
        )
    }
}

export default Loading;