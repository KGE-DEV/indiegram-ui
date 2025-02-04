import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import Loading from '../Loading/Loading.js';
import {sendResetPassword} from '../../Utilities/UserUtilites.js';

import {sendUserEvent, PAGE_VIEWED_EVENT} from '../../Utilities/EventUtilities.js';

import "./ResetPassword.scss";

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            token: "",
            redirectToLogin: false,
            error: false,
            success: false,
            loading: false,
            timer: 5,
            isSettingPassword: false
        }
    }

    componentDidMount() {
        sendUserEvent(PAGE_VIEWED_EVENT);  
        if(typeof(this.props.userRole) === "undefined" || this.props.userRole === "unauthorized") {
            this.props.updateUserRole();
        }
        let token = this.getTokenFromParams("token");
        if(!token || token.length === 0) {
            this.setState({
                redirectToLogin: true
            })
        } else {
            this.setState({
                token,
                isSettingPassword: this.getTokenFromParams("set") === "true" ? true : false,
                email: this.getTokenFromParams("email")
            })
        }
    }

    handlePasswordInputChange = (evt) => {
        let password = evt.target.value;
        this.setState({
            password
        })
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
        Promise.resolve(sendResetPassword(data))
            .then(response => {
                if(response.data.success) {
                    this.setState({
                        loading: false,
                        success: true
                    })
                    this.setTimer();
                } else {
                    this.setState({
                        error: true,
                        loading: false
                    })
                }
            })
    }

    setTimer = () => {
        let interval = setInterval(() => {
            this.setState({
                timer: this.state.timer - 1
            })
            if(this.state.timer === 0) {
                this.clearTimer(interval)
            }
        }, 1000);
    }

    clearTimer = (interval) => {
        clearInterval(interval);
    }

    getTokenFromParams = (name) => {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(global.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    render() {
        let {redirectToLogin, email, password, error, loading, success, timer, isSettingPassword} = this.state;

        let {userRole} = this.props;
        if(typeof(userRole) !== "undefined" && userRole !== "unauthorized") {
            return (
                <Redirect to="/" />
            )
        }

        if(loading) {
            return (
                <Loading />
            )
        }
        if(redirectToLogin) {
            return (
                <Redirect to="/" />
            )
        }
        if(timer === 0) {
            this.props.updateUserRole();
            return <Redirect to="/feed/1" />;
        }

        if(success) {
            return (
                <div className="container login reset-password"> 
                    <p className="reset-password__success">You have successfully {isSettingPassword ? "created" : "reset"} your password. You will be automatically logged on in {timer} second{timer === 1 ? "" : "s"}.</p>
                </div>
            )
        }
        return (
            <div className="container login reset-password"> 
            <Link to="/" ><p className="feed__go-back"><FontAwesomeIcon icon={faChevronLeft} /> Back</p></Link>
            <Link to="/"><p className="feed__go-back">Login</p></Link>
                <form>
                    
                    
                    <p className="reset-password__message">{isSettingPassword ? "Enter a password below to create your login for IndieGram.com associated with " + email + "." : "Enter your new password below to change your login for IndieGram.com associated with " + email + "."}</p>
                    {error ? <p className="login__error">Please Try Again</p> : null}
                    <input type="hidden" placeholder="Email" className="login__input" value={email} onChange={this.handleEmailInputChange}/>
                    <input type="password" placeholder="Password" className="login__input" value={password} onChange={this.handlePasswordInputChange}/>
                    <button className="login__submit" onClick={this.handleSubmitClick}>Submit</button>
                </form>
            </div>
        )
    }
}

export default ResetPassword;