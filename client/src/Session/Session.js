import React from 'react';
import axios from 'axios';
import Card from './Card.js';
import Search from './Search.js';
import './Session.css';

export default class Session extends React.Component {
  constructor(props){
    super(props);
    this.getSessions  = this.getSessions.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {search: '', sessions : []}; 
  }

  componentWillMount() {
    this.getSessions();
  }

  componentWillReceiveProps(){
    this.getSessions();
  }

  getSessions(){
    axios.get('/study')
    .then(res => {
      const studySessions = res.data;
      this.setState({sessions: studySessions});
    });
  }

  handleSearch(search){
      this.setState({search:search});
  }

  render(){
    return (
      <div className="session">
        <div className="sessionInputContainer">
          <Search onSearchChange={this.handleSearch}></Search>
        </div>
        <div className="display">
            {this.state.sessions.map(row => 
              <Card key={row._id} search={this.state.search} {...row}></Card>
              )
            }
        </div>
      </div>
    );
  }
}