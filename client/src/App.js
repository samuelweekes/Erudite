import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar/Navbar.js';
import Study from './Study/Study.js';
import Session from './Session/Session.js';
import Stat from './Stat/Stat.js';
import Account from './Account/Account.js';
import SecuredRoute from './SecuredRoute';
import Callback from './Callback';
import './App.css';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Router>
          <Navbar/>
          <div className="container">
            <Switch>
              <SecuredRoute exact component={Study} path="/" />
              <SecuredRoute component={Account} path="/account" />
              <SecuredRoute exact component={Session} path="/session" />
              <SecuredRoute exact component={Stat} path="/stat" /> />
            </Switch>
              <Route exact path='/callback' component={Callback}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
