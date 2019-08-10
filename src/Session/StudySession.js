import React from 'react';
import {Reward} from './Reward.js';
import {TimeInput} from './TimeInput.js';
import axios from 'axios';
import './StudySession.css';
import { thisExpression } from '@babel/types';

class StudySession extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
  }

  handleSubmit(event){
    this.props.handleSubmit();
    event.preventDefault();
  }

  handleTimeChange(time){
    this.props.handleTimeChange(time);
  }

  handleTypeChange(event){
    this.props.handleTypeChange(event);
  }

  handleNoteChange(event){
    this.props.handleNoteChange(event);
  }

  render() {
    return (
      <div className="StudySession">
        <Reward reward={this.props.reward}></Reward>
        <form className="rewardForm" onSubmit={this.handleSubmit}>
          <TimeInput time={this.props.time} onTimeChange={this.handleTimeChange}></TimeInput>
          <div>
            <label>
              Type: 
              <div>
                <input className="typeInput" type="text" value={this.props.type} onChange={this.handleTypeChange} />
              </div>
            </label>
          </div> 
          <div>
            <label>
              Notes: 
              <div>
                <input className="notesInput" type="text" value={this.props.note} onChange={this.handleNoteChange} />
              </div>
            </label>
          </div> 
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
export {StudySession}
