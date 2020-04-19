import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import Loading from '../Loading/Loading.js';
import {sendResetPasswordRequest} from '../../Utilities/UserUtilites.js';

import {sendUserEvent, LOGGED_IN_EVENT, PAGE_VIEWED_EVENT} from '../../Utilities/EventUtilities.js';

import './ForgotPassword.scss';

class ForgetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            action: "ui_reset_password",
            error: false,
            loading: false,
            success: false
        }
    }

    componentDidMount() {
        sendUserEvent(PAGE_VIEWED_EVENT);
    }

    handleEmailInputChange = (evt) => {
        let email = evt.target.value;
        this.setState({
            email
        })
    }

    handleSubmitClick = (evt) => {
        this.setState({
            loading: true
        })
        evt.preventDefault();
        let data = this.state;
        Promise.resolve(sendResetPasswordRequest(data))
            .then(response => {
                if(response.data.success) {
                    setTimeout(() => {
                        sendUserEvent(LOGGED_IN_EVENT);
                        this.setState({
                            success: true,
                            loading: false
                        })
                    }, 1500)
                } else {
                    this.setState({
                        error: true,
                        loading: false
                    })
                }
            })
    }

    render() {
        let {userRole} = this.props;
        if(userRole === "admin" || userRole === "subscriber") {
            return <Redirect to="/feed/1" />;
        }
        let {email, error, loading, success} = this.state;
        if(loading) {
            return <Loading />
        }
        if(success) {
            return (
                <div className="container login forgot-password"> 
                    <Link to="/" ><p className="feed__go-back"><FontAwesomeIcon icon={faChevronLeft} /> Back</p></Link>
                    <p className="forgot-password__message forgot-password__message--success">Please check the email entered for your password reset link.</p> 
                </div>
            )
        }
        return (
            <div className="container login forgot-password"> 
            <Link to="/" ><p className="feed__go-back"><FontAwesomeIcon icon={faChevronLeft} /> Back</p></Link>
                <form>
                    <p className="login__header">Forgot Password</p>
                    <p className="forgot-password__message">Please enter your email address. You will receive a link to create a new password via email.</p>
                    {error ? <p className="login__error">Something went wrong. Please try again.</p> : null}
                    <input type="email" placeholder="Email" className="login__input" value={email} onChange={this.handleEmailInputChange}/>
                    <button className="login__submit" onClick={this.handleSubmitClick}>Submit</button>
                </form>
            </div>
        )
    }
}

export default ForgetPassword;