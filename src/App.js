import React from 'react';

import { Switch, BrowserRouter, Route } from 'react-router-dom'

import Header from './Components/Header/Header.js';
import FeedContainer from './Components/Feed/FeedContainer.js';
import Footer from './Components/Footer/Footer.js';

function App() {
  return (
    <React.Fragment>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path="/feed/:page" exact component={FeedContainer}/>
          <Route path="/" component={FourOhFour} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </React.Fragment>
  );
}

function FourOhFour() {
  return (
    <p>This is the 404 page</p>
  )
}

export default App;
