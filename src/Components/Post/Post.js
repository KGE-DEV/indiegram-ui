import React, { Component } from 'react';
import Moment from 'moment';

import Comments from '../Comments/Comments.js';
import NewComment from '../Comments/NewComment.js';
import './Post.scss';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newComments: 0
        }
    }

    formatContent = (content) => {
        try {
            return decodeURIComponent(content.replace(/\+/g, '%20'));
        } catch (error) {
            console.log(error, content);
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

    render() {
        let {post_content, post_image_url, date_time_added, post_id, postClass} = this.props;
        return (
            <div className={postClass} >
                {this.props.individualPost ?
                <img className="post__image" src={post_image_url} alt="" onLoad={this.props.handleImageLoaded} />
                : 
                <img className="post__image" src={post_image_url} alt="" onLoad={this.props.handleImageLoaded} onClick={() => {this.props.showIndividualPost(this.props)}}/>}
                
                <div className="post__content-cont">
                    <p className="post__date">{this.formatDate(date_time_added)}</p>
                    <p className="post__content">{this.formatContent(post_content)}</p>
                    <Comments post_id={post_id} newComments={this.state.newComments} showAllComments={this.props.individualPost}/>
                    <hr />
                    <NewComment post_id={post_id} updateComment={this.updateComment} />
                </div>
            </div>
        )
    }
}

export default Post;