import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './Navbar/Navbar.js';
import Study from './Study/Study.js';
import Account from './Account/Account.js';
import './App.css';
// import {Sorter} from './Sorter/Sorter.js';
// import {DopaStudy} from './DopaStudy.js';


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
              <Route exact component={Account} path="/sessions" />
              <Route exact component={Account} path="/stats" /> />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
