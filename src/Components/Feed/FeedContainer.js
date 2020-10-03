import React from 'react';
import {useParams, useHistory} from 'react-router-dom';

import Feed from './Feed.js';

export default function FeedContainer(props) {
    let {page} = useParams();
    let history = useHistory();
    return <Feed page={page} userRole={props.userRole} history={history}/>
}