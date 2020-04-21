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
             loading: false,
             success: false,
             failed: false
         }
    }

    handleFileOnChange = (evt) => {
        let fr = new FileReader();
        let that = this;
        fr.onload = function(e) { 
            that.setState({
                img: this.result
            })
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
        Promise.resolve(createPost(this.state))
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

    resetPage = () => {
        this.setState({
            failed: false,
            success: false,
            caption: "",
            img: null
        })
    }

    render() {        
        let {loading, img, caption, success, failed} = this.state;

        if(loading) {
            return <Loading />;
        }
        if(success) {
            return (
                <div>
                <p className="add-post__success">Post was submitted successfully!</p>
                    <p className="home__link" onClick={this.resetPage}>Add Another Post</p>
                </div>
            )
        }
        if(failed) {
            return (
                <div>
                <p className="add-post__success">Oops. Something went wrong.</p>
                    <p className="home__link" onClick={this.resetPage}>Try Again</p>
                </div>
            )
        }
        return (
            <div className="container add-post">
                <Link to="/admin" ><p className="feed__go-back"><FontAwesomeIcon icon={faChevronLeft} /> Back</p></Link>
                <p className="login__header">Add Post</p>
                <label className="add-post__input-label">
                    {img ? "Choose Another Image" : "Choose An Image"}
                    <input type="file" accept="image/*" className="add-post__input" onChange={this.handleFileOnChange}/>
                </label>
                {img ? 
                    <img className="add-post__target" alt="" src={this.state.img}/>
                    :
                    null
                }
                <textarea className="add-post__caption" placeholder="Caption" rows="6" value={caption} onChange={this.handleTextAreaChange}></textarea>
                {img && caption.length > 0 && <button className="add-post__submit" onClick={this.handleSubmitClick}>Submit Image</button>}
            </div>
        )
    }
}

export default AddPost;