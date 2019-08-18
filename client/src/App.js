import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar/Navbar.js';
import Study from './Study/Study.js';
import Session from './Session/Session.js';
// import {Stat} from './Stat/Stat.js';
import Account from './Account/Account.js';
import './App.css';


class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Router>
          <Navbar/>
          <div className="container">
            <Switch>
              <Route exact component={Study} path="/" />
              <Route component={Account} path="/account" />
              <Route exact component={Session} path="/sessions" />
              <Route exact component={Account} path="/stats" /> />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
