import React from 'react';
import axios from 'axios';
import auth0Client from '../Auth';
import {FaPlus, FaMinus, FaRedo} from 'react-icons/fa';
import './Account.module.css';

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
    axios.get('/data/account', {headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }})
    .then(res => {
      this.setState({balance : res.data.balance, 
                     maxBalance : res.data.maxBalance,
                     reward: res.data.reward,
                     maxReward: res.data.maxReward,
                    });
    });
  }

  addBalance(){
    axios.post('data/account/', {balance: this.state.funds},
    {headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}})
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
    axios.post('/data/account/', {balance: negativeFunds},
    {headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}})
    .then(res => {
      this.setState({balance : res.data.balance, maxBalance : res.data.maxBalance, funds: 0});
    });
  }

   addReward(){
    axios.post('/data/account/reward', {balance: this.state.rewardFunds},
    {headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}})
    .then(res => {
      this.setState({reward : res.data.reward, maxReward : res.data.maxReward, rewardFunds: 0});
    });
  }

  removeReward(){
    if((parseInt(this.state.reward,10) - this.state.rewardFunds) < 0) {
      return;
    }
    const negativeFunds = -(parseInt(this.state.rewardFunds, 10));
    axios.post('/data/account/reward', {balance: negativeFunds},
    {headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}})
    .then(res => {
      this.setState({reward : res.data.reward, maxReward : res.data.maxReward, rewardFunds: 0});
    });
  }

  resetBalance(){
    axios.post('/data/account/reset', {}, {headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}})
    .then(res => {
      this.setState({balance : res.data.balance, maxBalance : res.data.maxBalance, funds: 0});
    });
  }

  resetReward(){
    axios.post('/data/account/resetreward', {}, {headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}})
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
        <div className="triangle"></div>
        <div className="balance-container">
          <div className="balance-max">
            <span>{this.state.maxBalance}</span>
          </div>
          <div className="balance-current">
            <span>{this.state.balance}</span>
          </div>
            <div className="button-container">
              <button className="minus-button" onClick={this.removeBalance}><FaMinus></FaMinus></button>
              <input  className="balance-input" min="0" type="number" value={this.state.funds} onChange={this.handleBalanceChange}></input>
              <button className="add-button" onClick={this.addBalance}><FaPlus></FaPlus></button>
            </div>
          <div className="reset-button">
            <FaRedo onClick={this.resetBalance}></FaRedo>
          </div>
        </div>
        <div className="account-seperator"> 
          <hr className="account-line"/>
        </div>
        <div className="reward-container">
          <div className="reward-max">
            <span>{this.state.maxReward}</span>
          </div>
          <div className="reward-current">
            <span>{this.state.reward}</span>
          </div>
            <div className="button-container">
              <button className="minus-button" onClick={this.removeReward}><FaMinus></FaMinus></button>
              <input  className="reward-input" min="0" type="number" value={this.state.rewardFunds} onChange={this.handleRewardChange}></input>
              <button className="add-button" onClick={this.addReward}><FaPlus></FaPlus></button>
            </div>
          <div className="reset-button">
            <FaRedo onClick={this.resetReward}></FaRedo>
          </div>
        </div>
      </div>
    );
  }
}