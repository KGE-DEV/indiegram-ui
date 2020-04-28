import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Moment from 'moment';
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
            currentSortCriteria: "",
            showSingleEvent: false,
            individualEvent: {}
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
            <p className="user-events__event-col user-events__event-col--header" onClick={() => {this.sortEventsBy("name")}} >User</p>
            <p className="user-events__event-col user-events__event-col--header" onClick={() => {this.sortEventsBy("event")}} >Event</p>
        </div>
        )
    }

    buildEventsTable = () => {
        let {events, eventSet} = this.state;
        let eventsSet = events.slice(eventSet, eventSet + 100);
        return eventsSet.map(eventObj => {
            let {event, name, id} = eventObj;
            return (
                <div className="user-events__event-row" key={id} onClick={() => {this.showSingleEvent(eventObj)}}>
                    <p className="user-events__event-col">{name}</p>
                    <p className="user-events__event-col">{event}</p>
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

    showSingleEvent = (event) => {
        this.setState({
            individualEvent: event,
            showSingleEvent: true
        })
    }

    showAllEvents = () => {
        this.setState({
            individualEvent: {},
            showSingleEvent: false
        })
    }

    buildSingleEventCard = (individualEvent) => {
        let {name, page, meta, event, date_time} = individualEvent;
        if(meta === null) {
            meta = "None";
        }
        return (
            <div className="container user-events">
                <p className="feed__go-back" onClick={this.showAllEvents}><FontAwesomeIcon icon={faChevronLeft} /> Back to All Events</p>
                <p className="login__header">User Event</p>
                <div className="user-events__card">
                    <p className="user-events__event">{event}</p>
                    <p className="user-events__property">User: {name}</p>
                    <p className="user-events__property">Page: {page}</p>
                    <p className="user-events__property">Additional Information: {meta}</p>
                    <p className="user-events__property">Date/Time: {this.formatDate(date_time)}</p>
                </div>
            </div>
        )
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
        return momentDate;
    }

    render() {
        let {showSingleEvent, individualEvent} = this.state;
        if(showSingleEvent) {
            return this.buildSingleEventCard(individualEvent);
        }
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