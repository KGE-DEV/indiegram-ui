import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';

import Post from '../Post/Post.js';
import Pagination from '../Pagination/Pagination.js';
import Loading from '../Loading/Loading.js';
import {getPaginatedPosts} from '../../Utilities/PostUtilities.js';
import {sendUserEvent, PAGE_VIEWED_EVENT} from '../../Utilities/EventUtilities.js';

import './Feed.scss';
import adminButton from './assets/img/admin-button.png';

class Feed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            imagesLoaded: 0,
            postClass: "post hidden",
            loading: false
        }
    }

    componentDidMount() {
        sendUserEvent(PAGE_VIEWED_EVENT);
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
                        postId={post.id} 
                        post_content={post.post_content} 
                        post_image_url={post.post_image_url} 
                        date_time_added={post.date_time_added} 
                        handleImageLoaded={this.handleImageLoaded} 
                        postClass={this.state.postClass}
                        individualPost={false}
                    />
                    )
            })
        )
    }

    render() {
        let {posts, loading} = this.state;
        let {userRole, page} = this.props;
        
        if(userRole === "unauthorized") {
            return <Redirect to="/"/>
        }
        if(posts.length === 0) {
            return <Loading />
        }
        return (
            <section className="feed container">
                {loading ? <Loading /> : null}
                {!loading && userRole === "admin" ? <Link to="/admin"><img src={adminButton} className="feed__admin-button" alt="admin button"/></Link> : null}
                {!loading && userRole === "subscriber" ? <img src={adminButton} className="feed__admin-button" alt="admin button"/> : null}
                {this.buildFeedPosts(posts)}
                {!loading && <Pagination page={page} />}
            </section>
        )
    }
}

export default Feed;