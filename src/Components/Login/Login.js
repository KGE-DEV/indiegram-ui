import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import {sendLoginRequest} from '../../Utilities/UserUtilites.js';

import './Login.scss';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            action: "ui_login",
            redirectAfterLogin: false,
            error: false
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
        evt.preventDefault();
        let data = this.state;
        Promise.resolve(sendLoginRequest(data))
            .then(response => {
                if(response.data.success) {
                    this.setState({
                        redirectAfterLogin: true
                    })
                    this.props.updateUserRole();
                } else {
                    this.setState({
                        error: true
                    })
                }
            })
    }

    render() {
        let {userRole} = this.props;
        if(userRole === "admin" || userRole === "subscriber") {
            console.log("redirecting because user role is authorized");
            return <Redirect to="/feed/1" />;
        }
        let {email, password, redirectAfterLogin, error} = this.state;
        if(redirectAfterLogin) {
            console.log("redirecting because login was successfull");
            return <Redirect to="/feed/1" />;
        }
        return (
            <div className="container login"> 
                <form>
                    <p className="login__header">Login</p>
                    {error ? <p className="login__error">Wrong Password</p> : null}
                    <input type="email" placeholder="Email" className="login__input" value={email} onChange={this.handleEmailInputChange}/>
                    <input type="password" placeholder="Password" className="login__input" value={password} onChange={this.handlePasswordInputChange}/>
                    <button className="login__submit" onClick={this.handleSubmitClick}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;