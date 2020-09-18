import React, {Component} from 'react';

import './Comments.scss';

import {getComments} from '../../Utilities/CommentUtilities.js';

class Comments extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comments: null,
            countOfUpdatedComments: 0,
            visibleCommentLimit: 2,
            showAllComments: false
        }
    }

    componentDidMount() {
        Promise.resolve(getComments(this.props.post_id))
            .then(data => {
                this.setState({
                    comments: data.data.comments
                })
            })
    }

    buildComments(comments) {
        let {visibleCommentLimit, showAllComments} = this.state;
        return comments.map((comment, index) => {
            if(index > visibleCommentLimit && !showAllComments && !this.props.individualPost) {
                return null;
            } else {
                return <p className="comments__comment" key={comment.id}><b className="comments__name" >{comment.name} </b>{comment.comment}</p>
            }
        })
    }

    handleShowAllCommentsClick = () => {
        this.setState({
            showAllComments: true
        })
    }
    
    handleHideAllCommentsClick = () => {
        this.setState({
            showAllComments: false
        })
    }

    componentDidUpdate() {
        if(this.props.newComments > this.state.countOfUpdatedComments) {
            Promise.resolve(getComments(this.props.post_id))
            .then(data => {
                this.setState({
                    comments: data.data.comments,
                    countOfUpdatedComments: this.state.countOfUpdatedComments + 1
                })
            })
        }
    }

    render() {
        let {comments, showAllComments} = this.state;

        if(!comments) {
            return null;
        }

        return (
            <div className="comments">
                {this.buildComments(comments)}
                {!showAllComments && comments.length > 3 && !this.props.individualPost && <p className="comments__show-more" onClick={this.handleShowAllCommentsClick}>Show more...</p>}
                {showAllComments && !this.props.individualPost && <p className="comments__show-more" onClick={this.handleHideAllCommentsClick}>Show less...</p>}
            </div>
        )
    }
}

export default Comments;