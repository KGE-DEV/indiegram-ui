import React, { Component } from 'react';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import Comments from '../Comments/Comments.js';
import NewComment from '../Comments/NewComment.js';
import './Post.scss';

import {getIndividualPost} from "../../Utilities/PostUtilities.js";
import {sendUserEvent, POST_VIEWED_EVENT} from '../../Utilities/EventUtilities.js';
import {TWO_MINUTES_IN_MILLISECONDS, PAGE_POSITION, setWithExpiry} from '../../Utilities/LocalStorageUtilities';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newComments: 0,
            redirectToIndividualPost: false,
            post_content: null, 
            post_image_url: null, 
            date_time_added: null
        }
    }

    formatContent = (content) => {
        try {
          content = content.replaceAll("\n", "<br>");
          return decodeURIComponent(content.replace(/\+/g, '%20'));
        } catch (error) {
          return content;
        }
    }

    formatDate = (date) => {
        let momentDate = Moment(date);
        let momentDateInAWeek = Moment(new Date());
        momentDateInAWeek = momentDateInAWeek.subtract(7, "days");
        if(momentDate > momentDateInAWeek) {
            momentDate = momentDate.subtract(7,'hours').fromNow();
        } else {
            momentDate = momentDate.format("MM.DD.YYYY");
        }
        return "Posted " + momentDate;
    }

    parseImageUrls = (urlStrings) => {
      if(urlStrings) {
        return urlStrings.split(",");
      }
      return [];
    }

    updateComment = () => {
        this.setState({
            newComments: this.state.newComments + 1
        })
    }

    componentDidMount = () => {
        if(this.props.individualPost) {
            sendUserEvent(POST_VIEWED_EVENT, this.props.postId);
            Promise.resolve(getIndividualPost(this.props.postId))
            .then(data => {
                if(data.error) {
                    // do nothing
                    // user is unauthorized and is handled by userRole
                } else {
                    let post = data.data.posts[0];
                    this.setState({
                        post_content: post.post_content,
                        post_image_url: post.post_image_url,
                        date_time_added: post.date_time_added
                    }, () => {
                        this.scrollToTop();
                    })
                }
            })
        }
    }

    redirectToIndividualPost = () => {
        this.setState({
            redirectToIndividualPost: true
        })
    }

    pushToHistory = (history) => {
        history.push(window.location.href);
    }

    savePagePosition = () => {
        setWithExpiry(PAGE_POSITION, document.documentElement.scrollTop, TWO_MINUTES_IN_MILLISECONDS);
    }

    scrollToTop = () => {
        window.scrollTo(0,0);
    }

    buildPostCarousel = (urls, individualPost) => {
      let {handleImageLoaded, postId} = this.props;
      if(individualPost) {
        return (
          <Carousel showThumbs={false} showStatus={false}>
            {urls.map(url => {
              return (
                <div className="post__flex-cont" key={url}>
                  <img className="post__image" src={url} alt="" onLoad={handleImageLoaded}/>
                </div>
              )
            })}
          </Carousel>
        )
      }

      return (
        <Link to={"/post/" + postId} onClick={this.savePagePosition}>
          <Carousel showThumbs={false} showStatus={false}>
            {urls.map(url => {
              return (
                <div className="post__flex-cont" key={url}>
                  <img className="post__image" src={url} alt="" onLoad={handleImageLoaded}/>
                </div>
              )
            })}
          </Carousel>
        </Link>
      )
    }

    buildSingleImage = (url, postId, individualPost) => {
      if(individualPost) {
        return (<img className="post__image" src={url} alt="" onLoad={this.props.handleImageLoaded} />)
      }
      return (
        <Link to={"/post/" + postId} onClick={this.savePagePosition}>
          <img key={url} className="post__image" src={url} alt="" onLoad={this.props.handleImageLoaded}/>
        </Link>
      )
    }

    render() {
        let {
          post_content, 
          post_image_url, 
          date_time_added, 
          postId, 
          postClass, 
          individualPost
        } = this.props;
        if(typeof(post_content) === "undefined") {
            post_content = this.state.post_content;
            post_image_url = this.state.post_image_url;
            date_time_added = this.state.date_time_added;
        }
        if(post_image_url === null) {
          return null;
        }
        post_image_url = this.parseImageUrls(post_image_url, individualPost);
        return (
            <div className={postClass} >
              {post_image_url.length > 1
              ? this.buildPostCarousel(post_image_url, individualPost):
                this.buildSingleImage(post_image_url[0], postId, individualPost)}
                <div className="post__content-cont">
                    <p className="post__date">{this.formatDate(date_time_added)}</p>
                    <p className="post__content" dangerouslySetInnerHTML={{ __html: this.formatContent(post_content)}}></p>
                    <Comments postId={postId} newComments={this.state.newComments} individualPost={individualPost}/>
                    <hr />
                    <NewComment postId={postId} updateComment={this.updateComment} />
                </div>
            </div>
        )
    }
}

export default Post;