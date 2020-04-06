import React, { Component } from 'react';
import {Redirect, Link} from 'react-router-dom';

import Post from '../Post/Post.js';
import Pagination from '../Pagination/Pagination.js';
import Loading from '../Loading/Loading.js';
import {getPaginatedPosts} from '../../Utilities/PostUtilities.js';

import './Feed.scss';

class Feed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        Promise.resolve(getPaginatedPosts(this.props.page))
            .then(data => {
                if(data.error) {
                    // do nothing
                    // user is unauthorized and is handled by userRole
                } else {
                    this.setState({
                        posts: data.data.posts
                    })
                }
            })
    }

    componentDidUpdate(prevProps) {
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
        let {posts} = this.state;
        let {userRole, page} = this.props;
        if(userRole === "unauthorized") {
            return <Redirect to="/" />
        }
        if(posts.length === 0) {
            return <Loading />
        }
        return (
            <section className="feed container">
                {userRole === "admin" ? <Link className="add-post-button" to="/add-post">Add Post</Link> : null}
                
                {this.buildFeedPosts(posts)}
                <Pagination page={page} />
            </section>
        )
    }
}

export default Feed;