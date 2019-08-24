import React from 'react';
import auth0Client from '../Auth';
import {Link, withRouter} from 'react-router-dom';
import home     from '../assets/home.svg';
import account  from '../assets/account.svg';
import sessions from '../assets/sessions.svg';
import stats    from '../assets/stats.svg';
import './Navbar.css';

class Navbar extends React.Component {
  constructor(props){
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {mobileMenu: false};
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    auth0Client.signOut();
    this.props.history.replace('/');
  };

  toggleMenu(){
    this.setState({mobileMenu : !this.state.mobileMenu});
    if(this.state.mobileMenu === true){
      let checkbox = document.getElementById("navCheck");
      checkbox.checked = false;
    }
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
      // case '/stat':
      //   img = stats;
      // break;
      default:
        img = home;
    }

    console.log(auth0Client.getProfile());

    return (
      <div>
        <nav className="mobile-nav" role="navigation">
          <div className="menuToggle">
            <input id="navCheck" type="checkbox" onClick={this.toggleMenu} />
            <span className="mobile-span"></span>
            <span className="mobile-span"></span>
            <span className="mobile-span"></span>
          </div>
        </nav>
        <nav className={`navBar${this.state.mobileMenu ? ' showMenu' : ''}`} >
          <div className="outerContainer">
            <div>
              <div className="imgOuter">
                <Link onClick={this.toggleMenu} to="/" className="">
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
                  <Link className="" onClick={this.toggleMenu} to="/">Home</Link>
                </li>
                <div className="seperator"> 
                  <hr className="line"/>
                </div>
                <li>
                  <Link className="" onClick={this.toggleMenu} to="/account">Account</Link>
                </li>
                <div className="seperator"> 
                  <hr className="line"/>
                </div>
                <li>
                  <Link className="" onClick={this.toggleMenu} to="/session">Sessions</Link>
                </li>
                <div className="seperator"> 
                  <hr className="line"/>
                </div>
                <li>
                  {auth0Client.isAuthenticated() &&
                    <div>
                      {/* <label className="mr-2 text-white">{auth0Client.getProfile().name}</label> */}
                      <Link className="" onClick={this.signOut} to="/session">Sign Out</Link>
                    </div>
                  }
                </li>
       
                {/* <div className="seperator"> 
                  <hr className="line"/>
                </div>
                <li>
                  <Link className="" onClick={this.toggleMenu} to="/stat">Stats</Link>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);