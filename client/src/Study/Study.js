import React from 'react';
import axios from 'axios';
import Reward from './Reward.js';
import Question from './Question.js';
import './Study.css';

const questionStates = ['TIME','TYPE','NOTES'];

export default class Study extends React.Component {
  constructor(props){
    super(props);
    this.handleLeftClick   = this.handleLeftClick.bind(this);
    this.handleRightClick  = this.handleRightClick.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleTimeChange  = this.handleTimeChange.bind(this);
    this.handleTypeChange  = this.handleTypeChange.bind(this);
    this.handleNoteChange  = this.handleNoteChange.bind(this);
    this.state = {reward: false, 
                  question: questionStates[0], 
                  time:"00:00",
                  type: '',
                  note: ''};
  }

  handleTimeChange(time){
    this.setState({time : time}); 
  }

  handleTypeChange(type){
    this.setState({type : type}); 
  }

  handleNoteChange(note){
    this.setState({note : note}); 
  }

  handleLeftClick(){
    const currentQuestionIndex = questionStates.indexOf(this.state.question);
    if(currentQuestionIndex > 0){
      this.setState({question: questionStates[currentQuestionIndex - 1]});
    }
  }

  handleRightClick(){
    const currentQuestionIndex = questionStates.indexOf(this.state.question);
    if(currentQuestionIndex < 2){
      this.setState({question: questionStates[currentQuestionIndex + 1]});
    }
  }

  handleSubmitClick(){
    axios.post('/study', {data: this.state})
    .then(res => {
      this.setState({reward: res.data.reward});
      setTimeout(() => {
        this.setState({question: questionStates[0], reward: false});
      }, 3000);
    });
  }

  render() {
    return (
      <div className="study">
        {this.state.reward ? 
          <Reward {...this.state}></Reward>
          :
          <Question {...this.state} 
            handleTimeChange={this.handleTimeChange}
            handleTypeChange={this.handleTypeChange}
            handleNoteChange={this.handleNoteChange}
            handleLeftClick={this.handleLeftClick}
            handleRightClick={this.handleRightClick}
            handleSubmitClick={this.handleSubmitClick}>
          </Question> 
        }
      </div>
    );
  }
}