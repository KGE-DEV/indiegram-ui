import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import Loading from '../Loading/Loading.js';
import {sendResetPassword} from '../../Utilities/UserUtilites.js';

import {sendUserEvent, PAGE_VIEWED_EVENT} from '../../Utilities/EventUtilities.js';

import './ResetPassword.scss';

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            token: "",
            redirectToHome: false,
            redirectToLogin: false,
            error: false,
            loading: false
        }
    }

    componentDidMount() {
        sendUserEvent(PAGE_VIEWED_EVENT);
        let token = this.getTokenFromParams("token");
        if(!token || token.length === 0) {
            this.setState({
                redirectToHome: true
            })
        } else {
            this.setState({
                token
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
                        redirectToLogin: true
                    })
                } else {
                    this.setState({
                        error: true,
                        loading: false
                    })
                }
            })
    }

    getTokenFromParams = (name) => {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(global.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    render() {
        let {redirectToHome, redirectToLogin, email, password, error, loading} = this.state;
        let {role} = this.props;
        if(typeof(role) != "undefined") {
            return (
                <Redirect to="/" />
            )
        }
        if(redirectToHome) {
            return (
                <Redirect to="/home" />
            )
        }

        if(loading) {
            return (
                <Loading />
            )
        }
        if(redirectToLogin) {
            return (
                <Redirect to="/login" />
            )
        }
        return (
            <div className="container login"> 
            <Link to="/" ><p className="feed__go-back"><FontAwesomeIcon icon={faChevronLeft} /> Back</p></Link>
            <Link to="/login"><p className="feed__go-back">Login</p></Link>
                <form>
                    <p className="login__header">Reset Password</p>
                    {error ? <p className="login__error">Please Try Again</p> : null}
                    <input type="email" placeholder="Email" className="login__input" value={email} onChange={this.handleEmailInputChange}/>
                    <input type="password" placeholder="Password" className="login__input" value={password} onChange={this.handlePasswordInputChange}/>
                    <button className="login__submit" onClick={this.handleSubmitClick}>Submit</button>
                </form>
            </div>
        )
    }
}

export default ResetPassword;