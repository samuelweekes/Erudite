import React from 'react';
import axios from 'axios';
import plus  from '../assets/plus.svg';
import minus from '../assets/minus.svg';
import reset from '../assets/reset.svg';
import './Account.css';

export default class Account extends React.Component {
  constructor(props){
    super(props);
    this.getBalance = this.getBalance.bind(this);
    this.addBalance = this.addBalance.bind(this);
    this.removeBalance = this.removeBalance.bind(this);
    this.resetBalance = this.resetBalance.bind(this);
    this.handleBalanceChange = this.handleBalanceChange.bind(this);
    this.state = {balance: 0, maxBalance: 0, funds: 0};
  }

  componentWillMount() {
    this.getBalance();
  }

  componentWillReceiveProps(){
    this.getBalance();
  }

  getBalance(){
    axios.get('/account')
    .then(res => {
      this.setState({balance : res.data.balance, maxBalance : res.data.maxBalance});
    });
  }

  addBalance(){
    axios.post('/account', {balance: this.state.funds})
    .then(res => {
      this.setState({balance : res.data.balance, maxBalance : res.data.maxBalance, funds: 0});
    });
  }

  removeBalance(){
    if((parseInt(this.state.balance,10) - this.state.funds) < 0) {
      this.resetBalance();
      return;
    }
    const negativeFunds = -(parseInt(this.state.funds, 10));
    axios.post('/account', {balance: negativeFunds})
    .then(res => {
      this.setState({balance : res.data.balance, maxBalance : res.data.maxBalance, funds: 0});
    });
  }

  resetBalance(){
    axios.post('/account/reset')
    .then(res => {
      this.setState({balance : res.data.balance, maxBalance : res.data.maxBalance, funds: 0});
    });
  }

  handleBalanceChange(event){
    this.setState({funds: event.target.value});
  }

  render(){
    return (
      <div className="account">
        <div className="triangleContainer">
          <div className="triangle"></div>
        </div>
        <div className="balanceContainer">
          <div className="balance">
            <div className="max">
              <span>{this.state.balance}</span>
            </div>
            <div className="current">
              <span>{this.state.maxBalance}</span>
            </div>
            <div className="buttonContainer">
              <div className="buttonGroup">
                <img onClick={this.removeBalance} src={minus}></img>
                <input className="balanceInput" min="0" type="number" value={this.state.funds} onChange={this.handleBalanceChange}></input>
                <img onClick={this.addBalance} src={plus}></img>
              </div>
            </div>
            <div className="resetButton">
                <img onClick={this.resetBalance} src={reset}></img>
              </div>
          </div>
        </div>
        <div className="rewardContainer">
          <div className="reward">
            <div className="max">
              <span>278</span>
            </div>
            <div className="current">
              <span>126</span>
            </div>
            <div className="buttonContainer">
              <div className="buttonGroup">
                <img src={minus}></img>
                <input className="balanceInput" min="0" type="number"></input>
                <img src={plus}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}