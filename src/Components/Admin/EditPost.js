import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faEdit } from '@fortawesome/free-solid-svg-icons'

import Loading from "../Loading/Loading.js";
import Pagination from "../Pagination/Pagination.js";
import {getPaginatedPosts, deletePost} from "../../Utilities/PostUtilities.js";

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            posts: [],
            page: this.getPageNumber(),
            deleteConfirmation: false,
            postIdToDelete: null,
            selectedPost: null
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
            })
            this.getPosts();
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
                            <img className="edit-post__image" src={post.post_image_url} alt="fuck the blind"/>
                            <p className="edit-post__caption">{this.formatContent(post.post_content)}</p>
                            <div className="edit-post__actions-cont">
                                <FontAwesomeIcon icon={faEdit} onClick={() => {this.handleEditPostClick(post)}} />
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

    handleEditPostClick = (post) => {
        console.log("Editing Post", {post});
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
                this.setState({
                    deleteConfirmation: false,
                    postIdToDelete: null,
                    selectedPost: null
                })
            }
        })
    }

    cancelDeletePost = () => {
        this.setState({
            deleteConfirmation: false,
            postIdToDelete: null,
            selectedPost: null
        })
    }

    render() {
        let {loading, page, deleteConfirmation, selectedPost} = this.state;
        if(loading) {
            return (
                <Loading />
            )
        }

        if(deleteConfirmation) {
            return (
                <div className="edit-post__delete container">
                    <p className="edit-post__delete-header">Are you sure you want to delete this post?</p>
                    <div className="edit-post__delete-cont">
                        <div className="edit-post__row edit-post__row--delete">
                            <img className="edit-post__image edit-post__image--delete" src={selectedPost.post_image_url} alt="fuck the blind"/>
                            <p className="edit-post__caption edit-post__caption--delete">{this.formatContent(selectedPost.post_content)}</p>
                            <div className="edit-post__delete-actions">
                                <button className="edit-post__btn edit-post__delete-btn" onClick={this.deletePost}>DELETE</button>
                                <button className="edit-post__btn edit-post__cancel-delete-btn" onClick={this.cancelDeletePost}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <React.Fragment>
                <section className="container edit-post">
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