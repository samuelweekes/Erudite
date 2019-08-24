import React from 'react';
import axios from 'axios';
import auth0Client from '../Auth';
import Card from './Card.js';
import Search from './Search.js';
import EditSession from './EditSession';
import './Session.css';

export default class Session extends React.Component {
  constructor(props){
    super(props);
    this.getSessions  = this.getSessions.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.state = {search: '', sessions : [], edit: false}; 
  }

  componentWillMount() {
    this.getSessions();
  }

  componentWillReceiveProps(){
    this.getSessions();
  }

  getSessions(){
    axios.get('/data/session', {headers: {'Authorization': `Bearer ${auth0Client.getIdToken()}`}})
    .then(res => {
      const studySessions = res.data;
      this.setState({sessions: studySessions});
    });
  }

  handleSearch(search){
      this.setState({search:search});
  }

  handleCardClick(id){
    this.setState({edit : id});
  }

  handleReset(){
    this.setState({edit:false});
    this.getSessions();
  }

  render(){
    return (
      <div className="session">
        <div className="session-input-container">
          {this.state.edit ? 
            <EditSession id={this.state.edit} handleReset={this.handleReset}></EditSession>
          :
            <Search onSearchChange={this.handleSearch}></Search>
          }
        </div>
        <div className="display">
            {this.state.sessions.map(row => 
              <Card key={row._id} handleClick={this.handleCardClick} search={this.state.search} {...row}></Card>
              )
            }
        </div>
      </div>
    );
  }
}