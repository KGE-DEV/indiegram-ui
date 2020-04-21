import React, {Component} from 'react';

import {postComment} from '../../Utilities/CommentUtilities.js';

import {sendUserEvent, COMMENT_ADDED_EVENT} from '../../Utilities/EventUtilities.js';

class NewComment extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            comment: "",
            addingComment: false
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
        this.setState({
            addingComment: true
        })
        let data = this.formatCommentData();
        Promise.resolve(postComment(data))
            .then(data => {
                sendUserEvent(COMMENT_ADDED_EVENT, this.state.comment);
                this.props.updateComment();
                this.setState({
                    comment: "",
                    addingComment: false
                })
            })
    }

    showAddButton = () => {
        if(this.state.comment.length > 0 && !this.state.addingComment) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className="comments__new-comment">
                <textarea className="comments__new-comment-input" type="text" placeholder="Add a comment..." value={this.state.comment} onChange={this.handleCommentInput}/>
                {this.showAddButton() ?
                <button className="comments__add-comment" onClick={this.postComment}>Add</button>
                :
                null}
            </div>
        )
    }
}

export default NewComment;