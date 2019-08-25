import React from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import Navbar from './Navbar/Navbar.js';
import Study from './Study/Study.js';
import Session from './Session/Session.js';
import Account from './Account/Account.js';
import SecuredRoute from './SecuredRoute';
import Callback from './Callback';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() { 
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
  }

  render(){
    return (
      <div className="app">
        <Router>
          <Navbar className="nav"/>
          <div className="container">
            <Switch>
              <SecuredRoute exact component={Study} path="/" />
              <SecuredRoute component={Account} path="/account" />
              <SecuredRoute exact component={Session} path="/session" />
              <Route exact path='/callback' component={Callback}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
