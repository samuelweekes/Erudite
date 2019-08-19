import React from 'react';
import axios from 'axios';
import plus  from '../assets/plus.svg';
import minus from '../assets/minus.svg';
import reset from '../assets/reset.svg';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './Account.css';

export default class Account extends React.Component {
  constructor(props){
    super(props);
    this.getAccountData = this.getAccountData.bind(this);
    this.addBalance = this.addBalance.bind(this);
    this.removeBalance = this.removeBalance.bind(this);
    this.addReward = this.addReward.bind(this);
    this.removeReward = this.removeReward.bind(this);
    this.resetBalance = this.resetBalance.bind(this);
    this.resetReward = this.resetReward.bind(this);
    this.handleBalanceChange = this.handleBalanceChange.bind(this);
    this.handleRewardChange = this.handleRewardChange.bind(this);
    this.state = {balance: 0, maxBalance: 0, reward: 0, maxReward: 0, funds: 0, rewardFunds: 0};
  }

  componentWillMount() {
    this.getAccountData();
  }

  componentWillReceiveProps(){
    this.getAccountData();
  }

  getAccountData(){
    axios.get('/data/account')
    .then(res => {
      this.setState({balance : res.data.balance, 
                     maxBalance : res.data.maxBalance,
                     reward: res.data.reward,
                     maxReward: res.data.maxReward});
    });
  }

  addBalance(){
    axios.post('data/account/', {balance: this.state.funds})
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
    axios.post('/data/account/', {balance: negativeFunds})
    .then(res => {
      this.setState({balance : res.data.balance, maxBalance : res.data.maxBalance, funds: 0});
    });
  }

   addReward(){
    axios.post('/data/account/reward', {balance: this.state.rewardFunds})
    .then(res => {
      this.setState({reward : res.data.reward, maxReward : res.data.maxReward, rewardFunds: 0});
    });
  }

  removeReward(){
    if((parseInt(this.state.reward,10) - this.state.rewardFunds) < 0) {
      return;
    }
    const negativeFunds = -(parseInt(this.state.rewardFunds, 10));
    axios.post('/data/account/reward', {balance: negativeFunds})
    .then(res => {
      this.setState({reward : res.data.reward, maxReward : res.data.maxReward, rewardFunds: 0});
    });
  }

  resetBalance(){
    axios.post('/data/account/reset')
    .then(res => {
      this.setState({balance : res.data.balance, maxBalance : res.data.maxBalance, funds: 0});
    });
  }

  resetReward(){
    axios.post('/data/account/resetreward')
    .then(res => {
      this.setState({maxReward : res.data.maxReward, rewardFunds: 0});
    });
  }
  

  handleBalanceChange(event){
    this.setState({funds: event.target.value});
  }

  handleRewardChange(event){
    this.setState({rewardFunds: event.target.value});
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
              <span>{this.state.maxBalance}</span>
            </div>
            <div className="current">
              <span>{this.state.balance}</span>
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
              <span>{this.state.maxReward}</span>
            </div>
            <div className="current">
              <span>{this.state.reward}</span>
            </div>
            <div className="buttonContainer">
              <div className="buttonGroup">
                <button className="minusButton" onClick={this.removeReward}><FaMinus></FaMinus></button>
                <input className="rewardInput" min="0" type="number" value={this.state.rewardFunds} onChange={this.handleRewardChange}></input>
                <button className="plusButton" onClick={this.addReward}><FaPlus></FaPlus></button>
              </div>
            </div>
            <div className="resetButton">
                <img onClick={this.resetReward} src={reset}></img>
              </div>
          </div>
        </div>
      </div>
    );
  }
}