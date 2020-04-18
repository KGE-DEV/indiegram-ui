import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import Loading from '../Loading/Loading.js';

import {getInvites, approveInvite} from '../../Utilities/UserUtilites.js';

class ApproveInvites extends Component {
    constructor(props) {
        super(props);

        this.state = {
            invites: [],
            loading: true
        }
    }

    componentDidMount() {
        Promise.resolve(getInvites())
            .then(response => {
                if(response.data.success) {
                    this.setState({
                        invites: response.data.invites,
                        loading: false
                    })
                }
            })
    }

    buildInvitesTable = (invites) => {
        if(invites.length === 0) {
            return (<p className="approve-invites__no-pending">There are no pending invites</p>);
        }
        let invitesArray = [];
        invitesArray.push(                
            <div key="header" className="approve-invites__table-hdr approve-invites__row">
                <span>Name</span>
                <span>Email</span>
                <span></span>
            </div>
        )
        invites.map(invite => {
            invitesArray.push(
                <div key={invite.id} className="approve-invites__row">
                    <span>{invite.name}</span>
                    <span>{invite.email}</span>
                    <span onClick={() => {this.approveInvite(invite)}}><FontAwesomeIcon className="approve-invites__approve-btn" icon={faThumbsUp} /></span>
                </div>
            )
            return true;
        })
        return invitesArray;
    }

    approveInvite = (invite) => {
        this.setState({
            loading: true
        })
        Promise.resolve(approveInvite(invite))
            .then(response => {
                if(response.data.success) {
                    Promise.resolve(getInvites())
                    .then(response => {
                        if(response.data.success) {
                            this.setState({
                                invites: response.data.invites,
                                loading: false
                            })
                        }
                    })
                }
            })
    }
    
    render() {
        let {loading, invites} = this.state;
        if(loading) {
            return (
                <Loading />
            )
        }
        return (
            <div className="container approve-invites">
                <Link to="/admin" ><p className="feed__go-back"><FontAwesomeIcon icon={faChevronLeft} /> Back</p></Link>
                <p className="login__header">Approve Invites</p>
                {this.buildInvitesTable(invites)}
            </div>
        )
    }
}

export default ApproveInvites;