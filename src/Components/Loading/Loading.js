import React, {Component} from 'react';

import './Loading.scss';
import loadingImg from './assets/img/loading.png';

class Loading extends Component {

    calculateLoadedPercentage = (uploadProgress) => {
        return Math.round((uploadProgress.loaded/uploadProgress.total)*100);
    }

    render() {
        let { uploadProgress } = this.props;
        let uploadPercent;
        if(uploadProgress) {
            uploadPercent = this.calculateLoadedPercentage(uploadProgress);
        }
        let loadingStyle = {
            backgroundImage: 'url(' + loadingImg + ')',
        }
        let loadingBarWidth = {
            width: uploadPercent + "%"
        }
        return (
            <div className="loading container">
                <div className="loading__icon" style={loadingStyle}></div>
                {uploadProgress ? 
                <div className="loading__text">
                    <div className="loading__loading_bar-cont">
                        <span className="loading__loaded_percent">{uploadPercent} % Uploaded</span>
                        <div className="loading__loading_bar" style={loadingBarWidth}></div>
                    </div>
                </div> 
                : 
                <p className="loading__text">Loading...</p>}
                
            </div>
        )
    }
}

export default Loading;