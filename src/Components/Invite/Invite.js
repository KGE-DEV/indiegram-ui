import React, {Component} from 'react';

import Loading from "../Loading/Loading.js";

import {sendInviteRequest} from '../../Utilities/InviteUtilities.js';
import {sendUserEvent, PAGE_VIEWED_EVENT} from '../../Utilities/EventUtilities.js';

import "./Invite.scss";

class Invite extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            name: "",
            action: "submit_invitation_request",
            emailValid: true,
            nameValid: true,
            error: false,
            success: false,
            loading: false
        }
    }

    componentDidMount() {
        sendUserEvent(PAGE_VIEWED_EVENT);
    }

    handleSubmitClick = (evt) => {
        this.setState({
            loading: true
        })
        evt.preventDefault();
        let {email, name, emailValid, nameValid} = this.state;
        if(!this.isEmailValid(email)) {
            emailValid = false;
        }

        if(name.length === 0) {
            nameValid = false;
        }

        this.setState({
            nameValid,
            emailValid
        })

        if(nameValid && emailValid) {
            let data = this.buildSendInviteUrlString(this.state);
            Promise.resolve(sendInviteRequest(data))
                .then(response => {
                    if(response.data.success) {
                        this.setState({
                            success: true, 
                            loading: false
                        })
                    } else {
                        this.setState({
                            error: true,
                            loading: false
                        })
                        setTimeout(function(){
                            window.location.reload();
                        }, 5000)
                    }
                })
        } else {
            this.setState({
                loading: false
            })
        }

    }

    handleNameInputChange = (evt) => {
        let name = evt.target.value;
        let nameValid = false;
        if(name.length > 0) {
            nameValid = true;
        }
        this.setState({
            name,
            nameValid
        })
    }

    handleEmailInputChange = (evt) => {
        let email = evt.target.value;
        let emailValid = false;
        if(this.isEmailValid(email)) {
            emailValid = true
        }
        this.setState({
            email,
            emailValid
        })
    }

    isEmailValid = (email) => {
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          return true;
        }
          
        return false;
    }

    buildSendInviteUrlString = (state) => {
        let {action, name, email} = state;
        return `?action=${action}&email=${email}&name=${name}`;
    }

    render() {
        let {name, email, nameValid, emailValid, success, error, loading} = this.state;
        let emailError = emailValid ? "" : "input-error";
        let nameError = nameValid ? "" : "input-error";

        if(loading) {
            return <Loading />;
        }

        if(error) {
            return (
                <div className="container invite"> 
                    <div id="jsInviteErrorMessage" className="invite__success">
                        <p className="invite__success-header">Error...</p>
                        <p className="invite__success-subheader">This page will refresh, then try again.</p>
                    </div>
                </div>
            )
        }

        if(success) {
            return (
                <div className="container invite"> 
                    <div id="jsInviteSuccessMessage" className="invite__success">
                        <p className="invite__success-header">Success!</p>
                        <p className="invite__success-subheader">You will recieve an email when your account has been created.</p>
                    </div>
                </div>
            )
        }

        return (
            <div className="container invite"> 
                <form id="jsInviteForm">
                    <p className="invite__header">Request Invitation</p>
                    <label className="invite__label">Name</label>
                    <input type="text" placeholder="Name" className={"invite__input " + nameError} value={name} onChange={this.handleNameInputChange}/>
                    <label className="invite__label">Email</label>
                    <input type="email" placeholder="Email" className={"invite__input " + emailError} value={email} onChange={this.handleEmailInputChange}/>
                    <button className="invite__submit" onClick={this.handleSubmitClick}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Invite;