import React, {Component} from 'react';
import Loading from '../Loading/Loading.js';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import {createPostV2} from '../../Utilities/PostUtilities.js';

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
             failed: false,
             imgArray: [],
             files: null,
             isCrossPost: false
         }
    }

    handleFileOnChangeV2 = (evt) => {
      let imgArray = Object.assign([], this.state.imgArray);
      let imgData = Object.assign([], this.state.imgData);
      let files = evt.target.files;
      for(let i = 0, a = evt.target.files,c = a.length;i<c;i++) {
        let fr = new FileReader();
        let that = this;

        let name = evt.target.files[i].name.split(' ').join('');;
        let type = evt.target.files[i].type;
        fr.onload = function() { 
          let img = new Image();
          let result = this.result;
          
          img.onload = function() {
            imgArray.push({img: result, file: files[i]})
            imgData.push({width: img.width, height: img.height, name, type, order: imgData.length});
            that.setState({
              imgArray,
              imgData,
              files: Object.assign([], files).reverse()
            })
          };
      
          img.src = this.result;
        };

        fr.readAsDataURL(evt.target.files[i]);
      }
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
        Promise.resolve(createPostV2(this.state, this.reportUploadProgress))
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

    buildImagePreviews = (imgArray) => {
      return (
        <Carousel showThumbs={false} showStatus={false} showIndicators={imgArray.length > 1}>
          {imgArray.map(img => {
            return (
              <div className="post__flex-cont" key={img.file.size}>
                <img className="post__image" src={img.img} alt=""/>
              </div>
            )
          })}
        </Carousel>
      )
    }

    handlePrivateToggle = () => {
        this.setState({
            isPrivate: !this.state.isPrivate
        })
    }

    handleCrossPostToggle = () => {
        this.setState({
            isCrossPost: !this.state.isCrossPost
        })
    }

    resetPage = () => {
        this.setState({
          caption: "",
          img: null,
          file: null,
          name: null,
          type: null,
          isPrivate: false,
          loading: false,
          success: false,
          failed: false,
          imgArray: [],
          files: null
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
        const {loading, img, caption, isPrivate, success, failed, uploadProgress, imgArray, isCrossPost} = this.state;

        const isPrivateLabel = isPrivate ? "Yes" : "No";
        const isPrivateClass = isPrivate ? "add-post__private-cont--yes" : "add-post__private-cont--no";

        const isCrossPostLabel = isCrossPost ? "Yes" : "No";
        const isCrossPostClass = isCrossPost ? "add-post__private-cont--yes" : "add-post__private-cont--no";
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
                <label className="add-post__input-label add-post__button" htmlFor="post-image-input">
                    {img ? "Choose Another Image" : "Choose An Image"}
                    <input
                        type="file"
                        accept="image/*"
                        className="add-post__input"
                        onChange={this.handleFileOnChangeV2}
                        id="post-image-input"
                        multiple
                    />
                </label>
                <textarea className="add-post__caption" placeholder="Post Caption" rows="6" value={caption} onChange={this.handleTextAreaChange}></textarea>
                <div className={"add-post__private-cont " + isPrivateClass} onClick={this.handlePrivateToggle}>
                    <label className="add-post__private-label">Make this post private?</label>
                    <p className="add-post__private-indicator">{isPrivateLabel}</p>
                </div>
                <div className={"add-post__private-cont " + isCrossPostClass} onClick={this.handleCrossPostToggle}>
                    <label className="add-post__private-label">Make this a cross post?</label>
                    <p className="add-post__private-indicator">{isCrossPostLabel}</p>
                </div>
                {imgArray.length > 0 ? 
                    this.buildImagePreviews(imgArray)
                    :
                    null
                }
                
                {imgArray.length > 0 && caption.length > 0 && <button className="add-post__submit add-post__button" onClick={this.handleSubmitClick}>Submit Image</button>}
            </div>
        )
    }
}

export default AddPost;