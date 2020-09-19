import React, {Component} from 'react';
import Loading from '../Loading/Loading.js';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import {createPost} from '../../Utilities/PostUtilities.js';

import "./AddPost.scss";

class AddPost extends Component {

    constructor(props) {
        super(props);
         this.state = {
             caption: "",
             img: null,
             file: null,
             name: null,
             type: null,
             isPrivate: false,
             loading: false,
             success: false,
             failed: false
         }
    }

    handleFileOnChange = (evt) => {
        let fr = new FileReader();
        let that = this;
        fr.onload = function() { 
            that.setState({
                img: this.result
            })

            var img = new Image();

            img.onload = function() {
                that.setState({
                    width: img.width,
                    height: img.height
                })
            };
        
            img.src = this.result; // is the data URL because called with readAsDataURL


        };
        fr.readAsDataURL(evt.target.files[0]);
        this.setState({
            file: evt.target.files[0],
            name: evt.target.files[0].name,
            type: evt.target.files[0].type
        })
    }

    handleTextAreaChange = (evt) => {
        this.setState({
            caption: evt.target.value
        })
    }

    handleSubmitClick = (evt) => {
        this.setState({
            loading: true
        })
        evt.preventDefault();
        Promise.resolve(createPost(this.state, this.reportUploadProgress))
            .then(response => {                
                let success = response.data;
                if(typeof(success) !== "undefined") {
                    this.setState({
                        success: true
                    })
                } else {
                    this.setState({
                        failed: true
                    })
                }
                this.setState({
                    loading: false
                })
            })
    }

    handlePrivateToggle = () => {
        this.setState({
            isPrivate: !this.state.isPrivate
        })
    }

    resetPage = () => {
        this.setState({
            failed: false,
            success: false,
            caption: "",
            img: null
        })
    }

    tryAgain = () => {
        this.setState({
            failed: false,
            success: false
        })
    }

    reportUploadProgress = (progressEvent) => {
        this.setState({
            uploadProgress: progressEvent
        })
    }

    render() {        
        let {loading, img, caption, isPrivate, success, failed, uploadProgress} = this.state;

        let isPrivateLabel = isPrivate ? "Yes" : "No";
        let isPrivateClass = isPrivate ? "add-post__private-cont--yes" : "add-post__private-cont--no";
        if(loading) {
            return <Loading uploadProgress={uploadProgress}/>;
        }
        if(success) {
            return (
                <div>
                <p className="add-post__success">Post was submitted successfully!</p>
                <p className="add-post__success--message">Your post is being processed. It will be availble to be viewed shortly. If there was an error, you will be notified via email.</p>
                <p className="add-post__add-another center-text" onClick={this.resetPage}>Add Another Post</p>
                </div>
            )
        }
        if(failed) {
            return (
                <div>
                <p className="add-post__success">Oops. Something went wrong.</p>
                    <p className="home__link center-text" onClick={this.tryAgain}>Try Again</p>
                </div>
            )
        }
        return (
            <div className="container add-post">
                <Link to="/admin" ><p className="feed__go-back"><FontAwesomeIcon icon={faChevronLeft} /> Back</p></Link>
                <p className="login__header add-post__header">Add Post</p>
                <label className="add-post__input-label add-post__button">
                    {img ? "Choose Another Image" : "Choose An Image"}
                    <input type="file" accept="image/*" className="add-post__input" onChange={this.handleFileOnChange}/>
                </label>
                <textarea className="add-post__caption" placeholder="Post Caption" rows="6" value={caption} onChange={this.handleTextAreaChange}></textarea>
                <div className={"add-post__private-cont " + isPrivateClass} onClick={this.handlePrivateToggle}>
                    <label className="add-post__private-label">Make this post private?</label>
                    <p className="add-post__private-indicator">{isPrivateLabel}</p>
                </div>
                {img ? 
                    <img className="add-post__target" alt="" src={this.state.img}/>
                    :
                    null
                }
                
                {img && caption.length > 0 && <button className="add-post__submit add-post__button" onClick={this.handleSubmitClick}>Submit Image</button>}
            </div>
        )
    }
}

export default AddPost;