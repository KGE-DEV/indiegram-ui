import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import {getLatestEvents} from "../../Utilities/EventUtilities.js";

class UserEvents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            eventSet: 0,
            flipSort: false,
            currentSortCriteria: ""
        }
    }

    componentDidMount() {
        Promise.resolve(getLatestEvents())
            .then(res => {
                this.setState({
                    events: res.data.events
                })
            })
    }

    buildEventsTableHeader = () => {
        return (
        <div className="user-events__event-row">
            <p className="user-events__event-col user-events__event-col--header" onClick={() => {this.sortEventsBy("event")}} >Event</p>
            <p className="user-events__event-col user-events__event-col--header" onClick={() => {this.sortEventsBy("name")}} >User</p>
            <p className="user-events__event-col user-events__event-col--header" onClick={() => {this.sortEventsBy("page")}} >Page</p>
            <p className="user-events__event-col user-events__event-col--header" >Additional Info</p>
        </div>
        )
    }

    buildEventsTable = () => {
        let {events, eventSet} = this.state;
        let eventsSet = events.slice(eventSet, eventSet + 100);
        return eventsSet.map(eventObject => {
            let {event, meta, name, page, id} = eventObject;
            return (
                <div className="user-events__event-row" key={id}>
                    <p className="user-events__event-col">{event}</p>
                    <p className="user-events__event-col">{name}</p>
                    <p className="user-events__event-col">{page}</p>
                    <p className="user-events__event-col">{meta}</p>
                </div>
            );
        })
    }

    sortEventsBy = (criteria) => {
        let {events, eventSet, flipSort} = this.state;
        let eventsSet = events.slice(eventSet, eventSet + 100);
        let sortedEvents = eventsSet.sort((a,b) => {
            let textA = a[criteria].toUpperCase();
            let textB = b[criteria].toUpperCase();
            if(flipSort) {
                return (textB < textA) ? -1 : (textB > textA) ? 1 : 0; 
            }
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
        this.setState({
            events: sortedEvents,
            currentSortCriteria: criteria,
            flipSort: !flipSort
        })
    }

    render() {
        return (
            <div className="container user-events">
                <Link to="/admin" ><p className="feed__go-back"><FontAwesomeIcon icon={faChevronLeft} /> Back</p></Link>
                <p className="login__header">User Events</p>
                <div className="user-events__event-table">
                    {this.buildEventsTableHeader()}
                    {this.buildEventsTable()}
                    <div className="user-events__pagination">
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default UserEvents;