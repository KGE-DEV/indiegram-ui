import React, {Component} from 'react';

import { Switch, BrowserRouter, Route, Redirect } from 'react-router-dom'

import Loading from './Components/Loading/Loading.js';
import Header from './Components/Header/Header.js';
import FeedContainer from './Components/Feed/FeedContainer.js';
import PostContainer from './Components/Post/PostContainer.js';
import Invite from './Components/Invite/Invite.js';
import Login from './Components/Login/Login.js';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword.js';
import ResetPassword from './Components/ResetPassword/ResetPassword.js';
import Terms from './Components/Terms/Terms.js';
import Footer from './Components/Footer/Footer.js';

import {getUserRole} from './Utilities/UserUtilites.js';
import Admin from './Components/Admin/Admin.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userRole: null
    }
  }

  componentDidMount() {
    Promise.resolve(getUserRole())
    .then(data => {
      if(data.error) {
        this.setState({
          userRole: "unauthorized"
        })
      } else {
        this.saveUserDataLocally(data.data);
        this.setState({
          userRole: data.data.role
      })
      }
    })
  }

  updateUserRole = () => {
    Promise.resolve(getUserRole())
    .then(data => {
      if(data.error) {
        this.setState({
          userRole: "unauthorized"
        })
      } else {
        this.saveUserDataLocally(data.data);
        this.setState({
          userRole: data.data.role
      })
      }
    })
  }

  saveUserDataLocally = (userData) => {
    window.localStorage.userId = userData.id;
  }

  render() {
    let {userRole} = this.state;
    if(!userRole) {
      return (
        <React.Fragment>
          <BrowserRouter>
            <Header />
            <Loading />
            <Footer />
          </BrowserRouter>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/feed/:page" exact render={(props) => <FeedContainer {...props} userRole={userRole} />}/>
            <Route path="/post/:postId" exact render={(props) => <PostContainer {...props} userRole={userRole} />}/>
            <Route path="/invite" exact render={(props) => <Invite {...props} userRole={userRole} />} />
            <Route path="/forgot-password" exact render={(props) => <ForgotPassword {...props} userRole={userRole} />} />
            <Route path="/reset-password" exact render={(props) => <ResetPassword {...props} userRole={userRole} updateUserRole={this.updateUserRole} />} />
            <Route path="/admin" render={(props) => <Admin {...props} userRole={userRole} />} />
            <Route path="/terms" render={(props) => <Terms {...props} userRole={userRole} />} />
            <Route path="/" exact render={(props) => <Login {...props} userRole={userRole} updateUserRole={this.updateUserRole} />} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    );
  }

}

export default App;
