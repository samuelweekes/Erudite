
import React from 'react';
import {StudySession} from './Session/StudySession.js';
import {Sorter} from './Sorter/Sorter.js';
import axios from 'axios';

class DopaStudy extends React.Component {
  constructor(props){
    super(props);
    this.getStudySessions = this.getStudySessions.bind(this);
    this.resetSubmitState = this.resetSubmitState.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {studySessions: [], 
                  time: '', 
                  type: '', 
                  note: '', 
                  reward: null};
  }

  componentWillMount(){
    this.getStudySessions();
  }

  getStudySessions(){
    axios.get('/study')
    .then(res => {
      const studySessions = res.data;
      this.setState({studySessions: studySessions});
    });
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

  handleSubmit(){
    axios.post('/study', {data: this.state})
    .then(res => {
      this.resetSubmitState();
      this.setState({reward: res.data.reward});
      setTimeout(() => {
        this.setState({reward: null});
      }, 10000);
      this.getStudySessions();
    });
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
            handleSubmit={this.handleSubmit}
            reward={this.state.reward}>
              
          </StudySession>
        </div>
        <div style={{minHeight:'100vh'}}>
          <Sorter studySessions={this.state.studySessions} getStudySessions={this.getStudySessions}></Sorter>
        </div>
      </div>
    );
  }
}

export {DopaStudy}


