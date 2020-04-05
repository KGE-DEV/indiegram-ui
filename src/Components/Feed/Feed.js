import React, { Component } from 'react';

import Post from '../Post/Post.js';
import Pagination from '../Pagination/Pagination.js';
import Loading from '../Loading/Loading.js';
import {getPaginatedPosts} from '../../Utilities/PostUtilities.js';
import {getUserRole} from '../../Utilities/UserUtilites.js';

import './Feed.scss';

class Feed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            userRole: "subscriber"
        }
    }

    componentDidMount() {
        Promise.resolve(getPaginatedPosts(this.props.page))
            .then(data => {
                this.setState({
                    posts: data.data.posts
                })
            })
        Promise.resolve(getUserRole())
            .then(data => {
                this.setState({
                    userRole: data.data.role
                })
            })
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps, this.props);
        if(this.props.page !== prevProps.page) {
            Promise.resolve(getPaginatedPosts(this.props.page))
            .then(data => {
                this.setState({
                    posts: data.data.posts
                })
            })
            window.scrollTo(0,0)
        }
    }

    buildFeedPosts(posts) {
        if(posts && posts.length < 1) {
            return null;
        }
        return (
            posts.map(post => {
                return <Post key={post.id} post_id={post.id} post_content={post.post_content} post_image_url={post.post_image_url} date_time_added={post.date_time_added} />
            })
        )
    }

    getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        let { posts, userRole } = this.state;
        let { page } = this.props;
        if(posts.length === 0) {
            return <Loading />
        }
        return (
            <section className="feed container">
                {userRole === "admin" ? <a className="add-post-button"href="/add-post">Add Post</a> : null}
                
                {this.buildFeedPosts(posts)}
                <Pagination page={page} />
            </section>
        )
    }
}

export default Feed;