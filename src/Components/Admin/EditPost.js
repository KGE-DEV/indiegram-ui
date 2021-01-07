import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faEdit, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import Loading from "../Loading/Loading.js";
import Pagination from "../Pagination/Pagination.js";
import {getPaginatedPosts, deletePost, sendEditPost} from "../../Utilities/PostUtilities.js";

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            posts: [],
            page: this.getPageNumber(),
            deleteConfirmation: false,
            postIdToDelete: null,
            editingPost: false,
            selectedPost: null,
            updatedPostContent: null
        }
    }

    getPosts = () => {
        Promise.resolve(getPaginatedPosts(this.state.page))
        .then(data => {
            if(data.error) {
                // do nothing
                // user is unauthorized and is handled by userRole
            } else {
                this.setState({
                    posts: data.data.posts,
                    loading: false
                })
            }
        })
    }

    componentDidMount() {
        this.getPosts();
    }

    componentDidUpdate() {
        let {page} = this.state;
        let currentPage = this.getPageNumber();
        if(page !== currentPage) {
            this.setState({
                loading: true,
                page: currentPage
            }, function() {this.getPosts();});
            window.scrollTo(0,0)
        }
    }

    getPageNumber = () => {
        let urlParts = window.location.href.split('/');
        return urlParts[urlParts.length - 1];
    }

    buildPostsList = () => {
        let {posts} = this.state;
        if(posts && posts.length < 1) {
            return null;
        }
        return (
            posts.map(post => {
                return (
                    <React.Fragment key={post.id}>
                        <hr />
                        <div className="edit-post__row">
                            <img className="edit-post__image" src={post.post_image_url.split(",")[0]} alt="post"/>
                            <p className="edit-post__caption">{this.formatContent(post.post_content)}</p>
                            <div className="edit-post__actions-cont">
                                <FontAwesomeIcon icon={faEdit} onClick={() => {this.handlesendEditPostClick(post)}} />
                                <FontAwesomeIcon icon={faTimesCircle} onClick={() => {this.handleDeletePostClick(post)}}/>
                            </div>
                        </div>
                    </React.Fragment>
                    )
            })
        )
    }

    formatContent = (content) => {
        try {
            return decodeURIComponent(content.replace(/\+/g, '%20'));
        } catch (error) {
            return content;
        }
    }

    handlesendEditPostClick = (post) => {
        this.setState({
            editingPost: true,
            selectedPost: post,
            updatedPostContent: this.formatContent(post.post_content)
        })
    }

    handleCaptionUpdate = (evt) => {
        this.setState({
            updatedPostContent: evt.target.value
        })
    }

    updatePost = () => {
        let {selectedPost, updatedPostContent} = this.state;
        this.setState({
            loading: true
        });
        Promise.resolve(sendEditPost({postId: selectedPost.id, postContent: updatedPostContent}))
        .then(data => {
            if(data.error) {
                // window.location.href = "/";
            } else {
                this.getPosts();
                this.cancelUpdate();
            }
        })
    }

    handleDeletePostClick = (post) => {
        this.setState({
            deleteConfirmation: true,
            postIdToDelete: post.id,
            selectedPost: post
        })
    }

    deletePost = () => {
        let {postIdToDelete} = this.state;
        this.setState({
            loading: true
        });
        Promise.resolve(deletePost(postIdToDelete))
        .then(data => {
            if(data.error) {
                // window.location.href = "/";
            } else {
                this.getPosts();
                this.cancelUpdate();
            }
        })
    }

    cancelUpdate = () => {
        this.setState({
            deleteConfirmation: false,
            postIdToDelete: null,
            selectedPost: null,
            updatedPostContent: null,
            editingPost: false
        })
    }

    render() {
        let {loading, page, deleteConfirmation, selectedPost, editingPost, updatedPostContent} = this.state;
        if(loading) {
            return (
                <Loading />
            )
        }

        if(editingPost) {
            return (
                <div className="edit-post__delete container">
                    <p className="edit-post__delete-header">Edit Post</p>
                    <div className="edit-post__delete-cont">
                        <div className="edit-post__row edit-post__row--delete">
                            <img className="edit-post__image edit-post__image--delete" src={selectedPost.post_image_url} alt="post to delete"/>
                            <textarea className="add-post__caption edit-post__textarea" rows="6" value={this.formatContent(updatedPostContent)} onChange={(evt) => {this.handleCaptionUpdate(evt)}} />
                            <div className="edit-post__delete-actions">
                                <button className="edit-post__btn edit-post__cancel-delete-btn" onClick={this.updatePost}>Update Post</button>
                                <button className="edit-post__btn edit-post__delete-btn" onClick={this.cancelUpdate}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        if(deleteConfirmation) {
            return (
                <div className="edit-post__delete container">
                    <p className="edit-post__delete-header">Are you sure you want to delete this post?</p>
                    <div className="edit-post__delete-cont">
                        <div className="edit-post__row edit-post__row--delete">
                            <img className="edit-post__image edit-post__image--delete" src={selectedPost.post_image_url} alt="post"/>
                            <p className="edit-post__caption edit-post__caption--delete">{this.formatContent(selectedPost.post_content)}</p>
                            <div className="edit-post__delete-actions">
                                <button className="edit-post__btn edit-post__delete-btn" onClick={this.deletePost}>DELETE</button>
                                <button className="edit-post__btn edit-post__cancel-delete-btn" onClick={this.cancelUpdate}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <React.Fragment>
                <section className="container edit-post">
                <Link to="/admin" ><p className="feed__go-back"><FontAwesomeIcon icon={faChevronLeft} /> Back</p></Link>
                    <p className="login__header">Edit Post</p>
                    {this.buildPostsList()}
                    <hr />
                    <Pagination page={page} location="/admin/edit-post/"/>
                </section>
            </React.Fragment>
        )
    }
}

export default EditPost;