import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import home     from '../assets/home.svg';
import account  from '../assets/account.svg';
import sessions from '../assets/sessions.svg';
import stats    from '../assets/stats.svg';
import './Navbar.css';

class Navbar extends React.Component {
  render() {  
    let img;
    switch(this.props.location.pathname){
      case '/':
        img = home;
      break;
      case '/account':
        img = account;
      break;
      case '/sessions':
        img = sessions;
      break;
      case '/stats':
        img = stats;
      break;
      default:
        img = home;
    }

    return (
      <nav className="navBar">
        <div className="outerContainer">
          <div>
            <div className="imgOuter">
              <Link to="/" className="">
                <img src={img} className="img" />
              </Link>
            </div>
            <div className="imgSeperator"> 
              <hr className="imgLine"/>
            </div>
          </div>
          <div className="linkContainer">
            <ul>
              <li>
                <Link className="" to="/">Home</Link>
              </li>
              <div className="seperator"> 
                <hr className="line"/>
              </div>
              <li>
                <Link className="" to="/account">Account</Link>
              </li>
              <div className="seperator"> 
                <hr className="line"/>
              </div>
              <li>
                <Link className="" to="/sessions">Sessions</Link>
              </li>
              <div className="seperator"> 
                <hr className="line"/>
              </div>
              <li>
                <Link className="" to="/stats">Stats</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);