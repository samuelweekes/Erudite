import React from 'react';
import './Account.css';

class Account extends React.Component {
  render(){
    return (
      <div className="Account">
        <div className="accountHeader">
          <span className="current">£{this.props.balance}</span>
          <span className="max">£{this.props.maxBalance}</span>
        </div>
        <div className="accountHeader">
        </div>
        <input className="funds" type="number" placeholder="Funds" value={this.props.funds} onChange={this.props.handleBalanceChange}></input>
        <div className="buttonContainer">
          <button className="fundsButton add" onClick={this.props.addBalance}>Add</button>
          <button className="fundsButton remove" onClick={this.props.removeBalance}>Remove</button>
          <button className="fundsButton cancel" onClick={this.props.resetBalance}>Reset</button>
        </div>
      </div>
    );
  }
}

export {Account}
