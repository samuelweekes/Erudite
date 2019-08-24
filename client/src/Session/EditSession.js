import React from 'react';
import axios from 'axios';
import auth0Client from '../Auth';
import {FaRedo, FaArrowLeft, FaCheck} from 'react-icons/fa';

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
      axios.get(`/data/session/${this.props.id}`, {headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}})
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
      axios.delete('/data/session/delete', {data:{id:this.props.id}, headers:{'Authorization': `Bearer ${auth0Client.getIdToken()}`}})
      .then(res => {
        this.props.handleReset();
      });
    }

    handleSubmit(){
      axios.post('/data/session/edit', {id: this.props.id, ...this.state}, {headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}})
      .then(res => {
        this.props.handleReset();
      });
    }

    render(){
        return (
          <div className="edit-session">
            <div className="card"> 
              <div className="left">
                <div className="cardType">
                  <input className="edit-type" placeholder="Type" value={this.state.type} onChange={this.handleTypeChange} type="text"></input>
                </div>
                <div className="card-time">
                  <input className="edit-time" placeholder="Time" value={this.state.time} onChange={this.handleTimeChange} type="time"></input>
                </div>
              </div>
              <div className="cardNote">
                  <textarea className="edit-note" placeholder="Note" value={this.state.note} onChange={this.handleNoteChange} type="text"></textarea>
              </div>
              <div className="right">
                <div className="card-reward">£{this.state.reward}</div>
                <div className="card-date">{this.state.date.substring(0,10)}</div>
              </div>
            </div>
            <div className="edit-buttons">
              <div className="session-back" onClick={this.props.handleReset}><FaArrowLeft></FaArrowLeft></div>
              <div className="session-reset" onClick={this.handleDelete}><FaRedo></FaRedo></div>
              <div className="session-submit" onClick={this.handleSubmit}><FaCheck></FaCheck></div>
            </div>
          </div>
        );
    }
}
