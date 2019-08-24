import React from 'react';
import auth0Client from '../Auth';
import {Link, withRouter} from 'react-router-dom';
import home     from '../assets/home.svg';
import account  from '../assets/account.svg';
import sessions from '../assets/sessions.svg';
import {FaBookOpen, FaCoins, FaCalendarCheck, FaDoorOpen} from 'react-icons/fa';
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.signOut = this.signOut.bind(this);
    this.selectNavItem = this.selectNavItem.bind(this);
  }

  signOut() {
    auth0Client.signOut();
  };

  selectNavItem(e) {
    const icon = e.target.closest('.m-nav-icon');
    const navIcons = document.querySelectorAll('.m-nav-icon');
    for(let i=0; i < navIcons.length; i++){
      navIcons[i].classList.remove('selected');
    }
    icon.classList.add('selected');
  }

  render() {  
    let img;
    switch(this.props.location.pathname){
      case '/':
        img = home;
      break;
      case '/account':
        img = account;
      break;
      case '/session':
        img = sessions;
      break;
      default:
        img = home;
    }

    return (
      <div>
        <nav className="m-nav" role="navigation">
          <div className="m-nav-container">
            <Link onClick={this.selectNavItem} className="m-nav-icon selected" to="/"><FaBookOpen></FaBookOpen></Link>
            <Link onClick={this.selectNavItem} className="m-nav-icon" to="/account"><FaCoins></FaCoins></Link>
            <Link onClick={this.selectNavItem} className="m-nav-icon" to="/session"><FaCalendarCheck></FaCalendarCheck></Link>
            <span className="m-nav-icon" onClick={this.signOut} ><FaDoorOpen></FaDoorOpen></span>
          </div>
        </nav>
        <nav className="d-nav">
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
                  <Link className="" to="/session">Sessions</Link>
                </li>
                <div className="seperator"> 
                  <hr className="line"/>
                </div>
                <li>
                  {auth0Client.isAuthenticated() &&
                    <div>
                      <Link className="" onClick={this.signOut} to="/session">Sign Out</Link>
                    </div>
                  }
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);