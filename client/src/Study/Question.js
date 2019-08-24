import React from 'react';
import {FaArrowRight, FaArrowLeft, FaCheck} from 'react-icons/fa';


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
        question.rightArrow = true;
        question.classes = 'margin0';
        break;
      case 'TYPE':
        question.text  = 'What subject did you study?';
        question.input = <input className="type" type="text" value={this.props.type} onChange={this.handleTypeChange} />;
        question.leftArrow  = true;
        question.rightArrow = true;
        question.classes = '';
        break;
      case 'NOTES':
        question.text  = 'Any notes to add for later?';
        question.input = <textarea className="note" value={this.props.note} onChange={this.handleNoteChange}></textarea>;
        question.submit    = true;
        question.leftArrow = true;
        question.classes = '';
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
      <div className="question-container">
        <h1 className="question-header">{question.text}</h1>
        <div className="input-container">
          {question.input}
        </div>
        <div className={`study-button-container ${question.classes}`}>
          {question.leftArrow  ? <div className="leftArrow" onClick={this.props.handleLeftClick}><FaArrowLeft></FaArrowLeft></div> : false} 
          {question.rightArrow ? <div className="rightArrow" onClick={this.props.handleRightClick}><FaArrowRight></FaArrowRight></div> : false} 
          {question.submit     ? <div className="submit" onClick={this.props.handleSubmitClick}><FaCheck></FaCheck></div> : false} 
        </div>
      </div>
    );
  }
}