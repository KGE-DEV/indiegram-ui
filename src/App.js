import React from 'react';

import { Switch, BrowserRouter, Route } from 'react-router-dom'

import Header from './Components/Header/Header.js';
import FeedContainer from './Components/Feed/FeedContainer.js';
import Home from './Components/Home/Home.js';
import Invite from './Components/Invite/Invite.js';
import Footer from './Components/Footer/Footer.js';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/feed/:page" exact component={FeedContainer}/>
          <Route path="/invite" exact component={Invite} />
          <Route path="/" exact component={Home} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
