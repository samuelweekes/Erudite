import React from 'react';
import {StudyRow} from './StudyRow.js';
import {StudySearch} from './StudySearch.js';
import './Sorter.css';

class Sorter extends React.Component {
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {search : ''}; 
  }

  handleSearch(search){
      this.setState({search:search});
  }

  render(){
    return (
      <div className="Sorter">
          <StudySearch onSearchChange={this.handleSearch}></StudySearch>
          <div style={{marginTop:'5rem'}}></div>
          <div className="studyHeader studyRow"> 
            <span className="StudyTime">Time</span>
            <span className="StudyText">Type</span>
            <span className="StudyNote">Note</span>
            <span className="StudyReward">Reward</span>
          </div>
          <div className="studyContainer">
            {this.props.studySessions.map(row => <StudyRow key={row._id} search={this.state.search} {...row}></StudyRow>)}
          </div>
        </div>
    );
  }
}

export {Sorter}
