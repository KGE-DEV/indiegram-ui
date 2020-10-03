import React, { Component } from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';

import Comments from '../Comments/Comments.js';
import NewComment from '../Comments/NewComment.js';
import './Post.scss';

import {getIndividualPost} from "../../Utilities/PostUtilities.js";
import {sendUserEvent, POST_VIEWED_EVENT} from '../../Utilities/EventUtilities.js';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newComments: 0,
            redirectToIndividualPost: false,
            post_content: null, 
            post_image_url: null, 
            date_time_added: null
        }
    }

    formatContent = (content) => {
        try {
            return decodeURIComponent(content.replace(/\+/g, '%20'));
        } catch (error) {
            return content;
        }
    }

    formatDate = (date) => {
        let momentDate = Moment(date);
        let momentDateInAWeek = Moment(new Date());
        momentDateInAWeek = momentDateInAWeek.subtract(7, "days");
        if(momentDate > momentDateInAWeek) {
            momentDate = momentDate.subtract(7,'hours').fromNow();
        } else {
            momentDate = momentDate.format("MM.DD.YYYY");
        }
        return "Posted " + momentDate;
    }

    updateComment = () => {
        this.setState({
            newComments: this.state.newComments + 1
        })
    }

    componentDidMount = () => {
        if(this.props.individualPost) {
            sendUserEvent(POST_VIEWED_EVENT, this.props.postId);
            Promise.resolve(getIndividualPost(this.props.postId))
            .then(data => {
                if(data.error) {
                    // do nothing
                    // user is unauthorized and is handled by userRole
                } else {
                    let post = data.data.posts[0];
                    this.setState({
                        post_content: post.post_content,
                        post_image_url: post.post_image_url,
                        date_time_added: post.date_time_added
                    })
                }
            })
        }
    }

    redirectToIndividualPost = () => {
        this.setState({
            redirectToIndividualPost: true
        })
    }

    pushToHistory = (history) => {
        history.push(window.location.href);
    }

    render() {
        let {post_content, post_image_url, date_time_added, postId, postClass, individualPost, handleImageLoaded} = this.props;
        if(typeof(post_content) === "undefined") {
            post_content = this.state.post_content;
            post_image_url = this.state.post_image_url;
            date_time_added = this.state.date_time_added;
        }
        return (
            <div className={postClass} >
                {individualPost ?
                <React.Fragment>
                    <img className="post__image" src={post_image_url} alt="" onLoad={handleImageLoaded} />
                </React.Fragment>
                : 
                <React.Fragment>
                    <Link to={"/post/" + postId}>
                        <img className="post__image" src={post_image_url} alt="" onLoad={handleImageLoaded}/>
                    </Link>
                </React.Fragment>}
                
                
                <div className="post__content-cont">
                    <p className="post__date">{this.formatDate(date_time_added)}</p>
                    <p className="post__content">{this.formatContent(post_content)}</p>
                    <Comments postId={postId} newComments={this.state.newComments} individualPost={individualPost}/>
                    <hr />
                    <NewComment postId={postId} updateComment={this.updateComment} />
                </div>
            </div>
        )
    }
}

export default Post;