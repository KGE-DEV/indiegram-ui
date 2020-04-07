import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import Post from '../Post/Post.js';
import Pagination from '../Pagination/Pagination.js';
import Loading from '../Loading/Loading.js';
import {getPaginatedPosts} from '../../Utilities/PostUtilities.js';

import './Feed.scss';

class Feed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            imagesLoaded: 0,
            postClass: "post hidden",
            loading: false,
            showIndividualPost: false
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        })
        if(this.props.userRole !== "unauthorized") {
            Promise.resolve(getPaginatedPosts(this.props.page))
            .then(data => {
                if(data.error) {
                    // do nothing
                    // user is unauthorized and is handled by userRole
                } else {
                    this.setState({
                        posts: data.data.posts,
                    })
                }
            })
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.page !== prevProps.page) {
            this.setState({
                loading: true,
                postClass: "post hidden",
                imagesLoaded: 0
            })
            Promise.resolve(getPaginatedPosts(this.props.page))
            .then(data => {
                this.setState({
                    posts: data.data.posts
                })
            })
            window.scrollTo(0,0)
        }
    }

    handleImageLoaded = () => {
        this.setState({ imagesLoaded: this.state.imagesLoaded + 1 }, () => {
            if(this.state.imagesLoaded === this.state.posts.length) {
                this.setState({
                    postClass: "post",
                    loading: false
                })
            }
        });
    }

    buildFeedPosts(posts) {
        if(posts && posts.length < 1) {
            return null;
        }
        return (
            posts.map(post => {
                return (
                    <Post 
                        key={post.id} 
                        post_id={post.id} 
                        post_content={post.post_content} 
                        post_image_url={post.post_image_url} 
                        date_time_added={post.date_time_added} 
                        handleImageLoaded={this.handleImageLoaded} 
                        postClass={this.state.postClass} 
                        showIndividualPost={this.showIndividualPost}
                    />
                    )
            })
        )
    }

    getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    showIndividualPost = (post) => {
        this.setState({
            showIndividualPost: true,
            individualPost: post
        })
    }

    goBack = () => {
        this.setState({
            individualPost: null,
            showIndividualPost: false
        })
    }

    render() {
        let {posts, loading, showIndividualPost, individualPost} = this.state;
        let {userRole, page} = this.props;
        if(userRole === "unauthorized") {
            return <Redirect to="/" />
        }
        if(posts.length === 0) {
            return <Loading />
        }
        if(showIndividualPost) {
            return (
                <section className="feed container">
                    <p className="feed__go-back" onClick={this.goBack}><FontAwesomeIcon icon={faChevronLeft} /> Back</p>
                    <Post 
                        post_id={individualPost.post_id} 
                        post_content={individualPost.post_content} 
                        post_image_url={individualPost.post_image_url} 
                        date_time_added={individualPost.date_time_added} 
                        postClass={this.state.postClass} 
                        individualPost={true}
                    />
                </section>
            )
        }
        return (
            <section className="feed container">
                {loading ? <Loading /> : null}
                {!loading && userRole === "admin" ? <Link className="add-post-button" to="/add-post">Add Post</Link> : null}
                {this.buildFeedPosts(posts)}
                {!loading && <Pagination page={page} />}
            </section>
        )
    }
}

export default Feed;