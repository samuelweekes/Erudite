import React from 'react';
import './Account.css';

class Account extends React.Component {
  render(){
    return (
      <div className="Account">
        <h4>Balance this month is: £{this.props.balance}, Total balance is: £{this.props.maxBalance}</h4>
        <input type="number" value={this.props.funds} onChange={this.props.handleBalanceChange}></input>
        <div className="">
          <button onClick={this.props.addBalance}>Add</button>
          <span style={{marginLeft:"10px"}}></span>
          <button onClick={this.props.removeBalance}>Remove</button>
          <span style={{marginLeft:"10px"}}></span>
          <button onClick={this.props.resetBalance}>Reset</button>
        </div>
      </div>
    );
  }
}

export {Account}
