import React from 'react';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import auth0Client from './Auth';
import Navbar from './Navbar/Navbar.js';
import Study from './Study/Study.js';
import Session from './Session/Session.js';
import Stat from './Stat/Stat.js';
import Account from './Account/Account.js';
import SecuredRoute from './SecuredRoute';
import Callback from './Callback';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() { 
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
      auth0Client.signOut();
    }
    this.setState({checkingSession:false});
  }

  render(){
    return (
      <div className="App">
        <Router>
          <Navbar/>
          <div className="container">
            <Switch>
              <SecuredRoute checkingSession={this.state.checkingSession} exact component={Study} path="/" />
              <SecuredRoute checkingSession={this.state.checkingSession} exact component={Account} path="/account" />
              <SecuredRoute checkingSession={this.state.checkingSession} exact component={Session} path="/session" />
              {/* <SecuredRoute checkingSession={this.state.checkingSession}exact component={Stat} path="/stat" /> /> */}
              <Route exact path='/callback' component={Callback}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);
