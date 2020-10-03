import React from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Post from './Post.js';

export default function PostContainer(props) {
    let {postId} = useParams();
    let history = useHistory();
    return (
        <section className="container">
            <p className="post__go-back" onClick={history.goBack}><FontAwesomeIcon icon={faChevronLeft} /> Back</p>
            <Post postId={postId} userRole={props.userRole} individualPost={true} postClass="post"/>
        </section>
    )
}