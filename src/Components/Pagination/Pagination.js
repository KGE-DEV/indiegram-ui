import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import {getPostCount} from '../../Utilities/PostUtilities.js';

import './Pagination.scss';

class Pagination extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0,
            page: props.page
        }
    }

    componentDidMount() {
        Promise.resolve(getPostCount())
        .then(data => {
            this.setState({
                count: data.data.count
            })
        })
    }

    buildPaginationBar(count, page) {
        let totalPages = Math.ceil(count / 10);
        let boxes = [];
        if(page > 1) {
            boxes.push(<Link to={this.getPageDestination(null, "back")} key="back"><div className="pagination__box"><FontAwesomeIcon key="forward" icon={faChevronLeft} /></div></Link>)
        }
        let maxBoxes = totalPages > 5 ? 5 : totalPages;
        let startingBox = totalPages < 6 ? 1 : page - 2;
        let endingBox = startingBox + maxBoxes - 1;
        if(endingBox > totalPages) {
            startingBox = page - 3; 
            endingBox = totalPages;
        }
        if(endingBox === totalPages) {
            startingBox = totalPages - 4;
        }

        if(startingBox < 1) {
            startingBox = 1;
            endingBox = totalPages > 5 ? 5 : totalPages;
        }
        for(let i = startingBox, c = endingBox;i<c + 1;i++) {
            if(i === page) {
                boxes.push(<div className="pagination__box active" key={i}>{i} </div>);
            } else if (i === endingBox) {
                boxes.push(<Link to={this.getPageDestination(totalPages, null)} key={totalPages}><div className="pagination__box">{totalPages} </div></Link>)
            } else {
                boxes.push(<Link to={this.getPageDestination(i, null)} key={i}><div className="pagination__box">{i}</div></Link>)
            }
            
        }
        if(page < totalPages) {
            boxes.push(<Link to={this.getPageDestination(null, "forward")} key="forward"><div className="pagination__box"><FontAwesomeIcon icon={faChevronRight} /></div></Link>)
        }
        return boxes;
    }

    getPageDestination = (page, direction) => {
        let currentPage = parseInt(this.props.page);
        let pageDestination = parseInt(page);
        if(direction === "forward") {
            pageDestination = currentPage + 1;
        }

        if(direction === "back") {
            pageDestination = currentPage - 1;
        }
        if(this.props.location) {
            return this.props.location + pageDestination;
        }
        return "/feed/" + pageDestination;
    }

    render() {
        if(this.state.count === 0) {
            return null
        }
        let page = this.props.page ? parseInt(this.props.page) : 1;
        return (
            <div className="pagination">
                {this.buildPaginationBar(this.state.count, page)}
            </div>
        )
    }
}

export default Pagination;