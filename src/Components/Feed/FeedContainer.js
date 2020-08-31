import React from 'react';
import {useParams} from 'react-router-dom';

import Feed from './Feed.js';

export default function FeedContainer(props) {
    let lastVisitedFeed = handleLastFeedLastVisited();
    let {page} = useParams();
    return <Feed page={lastVisitedFeed ? lastVisitedFeed : page} userRole={props.userRole}/>
}

function handleLastFeedLastVisited () {
    if(localStorage && localStorage.lastVisitedFeed) {
        let lastVisitedFeed = localStorage.lastVisitedFeed;
        localStorage.removeItem("lastVisitedFeed");
        return lastVisitedFeed;
    } else {
        return null;
    }
}