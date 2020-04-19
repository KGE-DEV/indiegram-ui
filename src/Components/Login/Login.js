import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';

import Loading from '../Loading/Loading.js';
import {sendLoginRequest} from '../../Utilities/UserUtilites.js';

import {sendUserEvent, LOGGED_IN_EVENT, PAGE_VIEWED_EVENT} from '../../Utilities/EventUtilities.js';

import './Login.scss';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            action: "ui_login",
            error: false,
            loading: false
        }
    }

    componentDidMount() {
        sendUserEvent(PAGE_VIEWED_EVENT);
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
        Promise.resolve(sendLoginRequest(data))
            .then(response => {
                if(response.data.success) {
                    this.props.updateUserRole();
                    setTimeout(() => {
                        sendUserEvent(LOGGED_IN_EVENT);
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
        let {email, password, error, loading} = this.state;
        if(loading) {
            return <Loading />
        }
        return (
            <div className="container login"> 
                <form>
                    {error ? <p className="login__error">Wrong Password</p> : null}
                    <input type="email" placeholder="Email" className="login__input" value={email} onChange={this.handleEmailInputChange}/>
                    <input type="password" placeholder="Password" className="login__input" value={password} onChange={this.handlePasswordInputChange}/>
                    <Link to="/forgot-password"><p className="feed__go-back center-text">Forgot Password?</p></Link>
                    <button className="login__submit" onClick={this.handleSubmitClick}>Submit</button>
                    <Link to="/terms"><p className="feed__go-back center-text">Request Access</p></Link>
                </form>
            </div>
        )
    }
}

export default Login;