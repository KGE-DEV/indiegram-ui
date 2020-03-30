import React, {Component} from 'react';

import {postComment} from '../../Utilities/CommentUtilities.js';

class NewComment extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            comment: ""
        }
    }

    handleCommentInput = (evt) => {
        this.setState({
            comment: evt.target.value
        })
    }

    formatCommentData() {
        return {
            comment: this.state.comment,
            postId: this.props.post_id
        }
    }

    postComment = () => {
        let data = this.formatCommentData();
        Promise.resolve(postComment(data))
            .then(data => {
                this.setState({
                    comment: ""
                })
            })
    }


    render() {
        return (
            <div className="comments__new-comment">
                <textarea className="comments__new-comment-input" type="text" placeholder="Add a comment..." value={this.state.comment} onChange={this.handleCommentInput}/>
                {this.state.comment.length > 0 ?
                <button className="comments__add-comment" onClick={this.postComment}>Add</button>
                :
                null}
            </div>
        )
    }
}

export default NewComment;