
import React from 'react';
import {StudySession} from './Session/StudySession.js';
import {Sorter} from './Sorter/Sorter.js';
import {Account} from './Account/Account.js';
import axios from 'axios';

class DopaStudy extends React.Component {
  constructor(props){
    super(props);
    this.getStudySessions = this.getStudySessions.bind(this);
    this.resetSubmitState = this.resetSubmitState.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleStudySubmit = this.handleStudySubmit.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.addBalance = this.addBalance.bind(this);
    this.removeBalance = this.removeBalance.bind(this);
    this.resetBalance = this.resetBalance.bind(this);
    this.handleBalanceChange = this.handleBalanceChange.bind(this);
    this.state = {studySessions: [], 
                  time: '', 
                  type: '', 
                  note: '', 
                  balance: 0,
                  maxBalance: 0,
                  funds: 0,
                  reward: null};
  }

  componentWillMount(){
    this.getStudySessions();
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

  getStudySessions(){
    axios.get('/study')
    .then(res => {
      const studySessions = res.data;
      this.setState({studySessions: studySessions});
    });
  }

  handleStudySubmit(){
    axios.post('/study', {data: this.state})
    .then(res => {
      this.resetSubmitState();
      this.setState({reward: res.data.reward, balance: res.data.balance, maxBalance: res.data.maxBalance});
      setTimeout(() => {
        this.setState({reward: null});
      }, 10000);
      this.getBalance();
      this.getStudySessions();
    });
  }

  handleBalanceChange(event){
    this.setState({funds: event.target.value});
  }

  resetSubmitState(){
    this.setState({time: '', type: '', note: '', reward: 0});
  }

  handleTimeChange(time){
    this.setState({time : time}); 
  }

  handleTypeChange(event){
    this.setState({type: event.target.value}); 
  }

  handleNoteChange(event){
    this.setState({note: event.target.value}); 
  }

  render() {
    return (
      <div>
        <div style={{height:'100vh'}}>
          <StudySession {...this.state} 
            handleTimeChange={this.handleTimeChange} 
            handleTypeChange={this.handleTypeChange} 
            handleNoteChange={this.handleNoteChange} 
            resetSubmitState={this.resetSubmitState} 
            getStudySessions={this.getStudySessions}
            handleStudySubmit={this.handleStudySubmit}
            reward={this.state.reward}>
              
          </StudySession>
        </div>
        <div style={{height:'100vh'}}>
          <Account 
            balance={this.state.balance} 
            maxBalance={this.state.maxBalance}
            addBalance={this.addBalance}
            removeBalance={this.removeBalance}
            resetBalance={this.resetBalance}
            handleBalanceChange={this.handleBalanceChange}
            funds={this.state.funds}
          ></Account>
        </div>
        <div style={{minHeight:'100vh'}}>
          <Sorter studySessions={this.state.studySessions} getStudySessions={this.getStudySessions}></Sorter>
        </div>
      </div>
    );
  }
}

export {DopaStudy}


