import React from 'react';
import submit     from '../assets/submit.svg';
import leftArrow  from '../assets/leftArrow.svg';
import rightArrow from '../assets/rightArrow.svg';

export default class Question extends React.Component {
  constructor(props){
    super(props);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
  }

  getQuestion(){
    const question = {};
    //Null our img src by default
    question.leftArrow  = null;
    question.rightArrow = null;
    question.submit     = null;
    switch(this.props.question){
      case 'TIME':
        question.text  = 'How long did you study for?';
        question.input = <input className="time" type="time" value={this.props.time} onChange={this.handleTimeChange} />;
        question.rightArrow = rightArrow;
        break;
      case 'TYPE':
        question.text  = 'What did you study?';
        question.input = <input className="type" type="text" value={this.props.type} onChange={this.handleTypeChange} />;
        question.leftArrow  = leftArrow;
        question.rightArrow = rightArrow;
        break;
      case 'NOTES':
        question.text  = 'Any notes for later?';
        question.input = <textarea className="note" value={this.props.note} onChange={this.handleNoteChange}></textarea>;
        question.submit    = submit;
        question.leftArrow = leftArrow;
        break;
      default:
        return false;
    }
    return question;
  }

  handleTimeChange(event){
    this.props.handleTimeChange(event.target.value);
  }

  handleTypeChange(event){
    this.props.handleTypeChange(event.target.value);
  }

  handleNoteChange(event){
    this.props.handleNoteChange(event.target.value);
  }

  render() {
    const question = this.getQuestion();
    return(
      <div className="questionContainer">
        <h1 className="question">{question.text}</h1>
        <div className="inputContainer">
          <img className="leftArrow" onClick={this.props.handleLeftClick} src={question.leftArrow}></img>
          {question.input}
          <img className="rightArrow" onClick={this.props.handleRightClick} src={question.rightArrow}></img>
          <img className="submit" onClick={this.props.handleSubmitClick} src={question.submit}></img>
        </div>
        
      </div>
    );
  }
}