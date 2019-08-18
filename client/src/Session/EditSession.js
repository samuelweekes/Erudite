import React from 'react';
import axios from 'axios';
import leftArrow  from '../assets/leftArrow.svg';
import submit     from '../assets/submit.svg';
import reset from '../assets/reset.svg';

export default class EditSession extends React.Component {
    constructor(props){
        super(props);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getSessionData = this.getSessionData.bind(this);
        this.state = ({type: '', time: '', note: '', reward: 0, date: ''});
    }

    componentWillMount(){
      this.getSessionData();
    }

    componentDidUpdate(nextProps){
      if (nextProps.id !== this.props.id) {
        this.getSessionData();
      }
    }

    getSessionData(){
      axios.post('/study/session', {id: this.props.id})
      .then(res => {
        const studySession = res.data;
        this.setState({...studySession});
      });
    }

    handleTypeChange(e){
      this.setState({type: e.target.value});
    }

    handleTimeChange(e){
      this.setState({time: e.target.value});
    }

    handleNoteChange(e){
      this.setState({note: e.target.value});
    }

    handleDelete(){
      axios.post('/study/session/delete', {id: this.props.id})
      .then(res => {
        this.props.handleReset();
      });
    }

    handleSubmit(){
      axios.post('/study/session/edit', {id: this.props.id, ...this.state})
      .then(res => {
        this.props.handleReset();
      });
    }

    render(){
        return (
          <div className="editSession">
            <div className="card"> 
              <div className="left">
                <div className="upper cardType">
                  <input placeholder="Type" value={this.state.type} onChange={this.handleTypeChange} type="text"></input>
                </div>
                <div className="lower cardTime">
                  <input placeholder="Time" value={this.state.time} onChange={this.handleTimeChange} type="time"></input>
                </div>
              </div>
              <div className="center cardNote">
                  <textarea placeholder="Note" value={this.state.note} onChange={this.handleNoteChange} type="text"></textarea>
              </div>
              <div className="right">
                <div className="upper cardReward">£{this.state.reward}</div>
                <div className="lower cardDate">{this.state.date.substring(0,10)}</div>
              </div>
            </div>
            <div className="editButtons">
              <img onClick={this.props.handleReset} src={leftArrow}></img>
              <img onClick={this.handleDelete} src={reset}></img>
              <img onClick={this.handleSubmit} src={submit}></img>
            </div>
          </div>
        );
    }
}
