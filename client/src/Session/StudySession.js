import React from 'react';
import {Reward} from './Reward.js';
import {TimeInput} from './TimeInput.js';
import './StudySession.css';

class StudySession extends React.Component {
  constructor(props){
    super(props);
    this.handleStudySubmit = this.handleStudySubmit.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
  }

  handleStudySubmit(event){
    this.props.handleStudySubmit();
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
        <form className="rewardForm" onSubmit={this.handleStudySubmit}>
          <TimeInput time={this.props.time} onTimeChange={this.handleTimeChange}></TimeInput>
          <div>
            <label>
              Type: 
              <div>
                <input className="typeInput rewardInput" type="text" value={this.props.type} onChange={this.handleTypeChange} />
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
            <input className="studySubmit" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
export {StudySession}