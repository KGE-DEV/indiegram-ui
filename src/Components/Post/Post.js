import React, { Component } from 'react';
import Moment from 'moment';

import Comments from '../Comments/Comments.js';
import NewComment from '../Comments/NewComment.js';
import './Post.scss';

class Post extends Component {

    formatContent = (content) => {
        try {
            return decodeURI(content); 
        } catch (error) {
            console.log(error, content);
        }
    }

    formatDate = (date) => {
        let momentDate = Moment(date, "YYYY-MM-DD hh:mm:ss.SSS");
        return "Posted " + momentDate.fromNow();
    }

    render() {
        let {post_content, post_image_url, date_time_added, post_id} = this.props;
        return (
            <div className="post">
                <img className="post__image" src={post_image_url} alt="" />
                <div className="post__content-cont">
                    <p className="post__date">{this.formatDate(date_time_added)}</p>
                    <p className="post__content">{this.formatContent(post_content)}</p>
                    <Comments post_id={post_id} />
                    <hr />
                    <NewComment post_id={post_id}/>
                </div>
            </div>
        )
    }
}

export default Post;