import React, {Component} from 'react';

import { Switch, BrowserRouter, Route } from 'react-router-dom'

import Header from './Components/Header/Header.js';
import FeedContainer from './Components/Feed/FeedContainer.js';
import Home from './Components/Home/Home.js';
import Invite from './Components/Invite/Invite.js';
import Login from './Components/Login/Login.js';
import Footer from './Components/Footer/Footer.js';

import {getUserRole} from './Utilities/UserUtilites.js';
import AddPost from './Components/AddPost/AddPost.js';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userRole: "unauthorized"
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
        this.setState({
          userRole: data.data.role
      })
      }
    })
  }

  render() {
    let {userRole} = this.state;
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/feed/:page" exact render={(props) => <FeedContainer {...props} userRole={userRole} />}/>
            <Route path="/invite" exact render={(props) => <Invite {...props} userRole={userRole} />} />
            <Route path="/login" exact render={(props) => <Login {...props} userRole={userRole} updateUserRole={this.updateUserRole} />} />
            <Route path="/add-post" exact render={(props) => <AddPost {...props} userRole={userRole} />} />
            <Route path="/" exact render={(props) => <Home {...props} userRole={userRole} />} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </React.Fragment>
    );
  }

}

export default App;
