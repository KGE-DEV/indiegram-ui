import React, {Component} from 'react';

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
            boxes.push(<div className="pagination__box" key="back" onClick={() => {this.handleBoxClick(null, "back")}}><FontAwesomeIcon key="forward" icon={faChevronLeft} /></div>)
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
            endingBox = 5;
        }
        for(let i = startingBox, c = endingBox;i<c + 1;i++) {
            if(i === page) {
                boxes.push(<div className="pagination__box active" key={i}>{i} </div>);
            } else if (i === endingBox) {
                boxes.push(<div className="pagination__box" key={totalPages} onClick={() => {this.handleBoxClick(totalPages, null)}}>{totalPages} </div>)
            } else {
                boxes.push(<div className="pagination__box" key={i} onClick={() => {this.handleBoxClick(i, null)}}>{i} </div>)
            }
            
        }
        if(page < totalPages) {
            boxes.push(<div className="pagination__box" key="forward" onClick={() => {this.handleBoxClick(null, "forward")}}><FontAwesomeIcon icon={faChevronRight} /></div>)
        }
        return boxes;
    }

    handleBoxClick = (page, direction) => {
        let currentPage = parseInt(this.props.page);
        let pageDestination = parseInt(page);
        if(direction === "forward") {
            pageDestination = currentPage + 1;
        }

        if(direction === "back") {
            pageDestination = currentPage - 1;
        }
        window.location.href = window.location.pathname + "?posts_page=" + pageDestination;
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