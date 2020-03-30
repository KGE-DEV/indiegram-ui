import React, {Component} from 'react';

import './Comments.scss';

import {getCommentsPreview} from '../../Utilities/CommentUtilities.js';

class Comments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comments: null
        }
    }

    componentDidMount() {
        Promise.resolve(getCommentsPreview(this.props.post_id))
            .then(data => {
                this.setState({
                    comments: data.data.comments
                })
            })
    }

    buildComments(comments) {
        return comments.map(comment => {
            return <p className="comments__comment" key={comment.id}><b className="comments__name" >{comment.name} </b>{comment.comment}</p>
        })
    }

    render() {
        if(!this.state.comments) {
            return null;
        }
        let {comments} = this.state;
        return (
            <div className="comments">
                {this.buildComments(comments)}
            </div>
        )
    }
}

export default Comments;