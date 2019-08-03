import React from 'react';
import {StudyRow} from './StudyRow.js';
import {StudySearch} from './StudySearch.js';
import './Sorter.css';

const studyRow = [
{
        "key"        : "1",
        "studyTime" : "12:23",
        "studyText" : "Software Testing",
        "studyNote" : "Did something",
        "studyReward" : "£0",
},
{
        "key"        : "2",
        "studyTime" : "16:46",
        "studyText" : "Math",
        "studyNote" : "Did y",
        "studyReward" : "£22",
},
{
        "key"        : "3",
        "studyTime" : "17:15",
        "studyText" : "Programming",
        "studyNote" : "Did something cool that was coool",
        "studyReward" : "£10",
},
{
        "key"        : "4",
        "studyTime" : "02:25",
        "studyText" : "Art",
        "studyNote" : "Did some stuff",
        "studyReward" : "£12",
},
{
        "key"        : "5",
        "studyTime" : "17:15",
        "studyText" : "Art",
        "studyNote" : "Some Cool Stuff",
        "studyReward" : "£10",
},
{
        "key"        : "6",
        "studyTime" : "17:15",
        "studyText" : "Math",
        "studyNote" : "Did a thing",
        "studyReward" : "£10",
},
{
        "key"        : "7",
        "studyTime" : "17:15",
        "studyText" : "Programming",
        "studyNote" : "Did stuff that was coool",
        "studyReward" : "£10",
},
{
        "key"        : "8",
        "studyTime" : "17:15",
        "studyText" : "Programming",
        "studyNote" : "Did something cool that was coool",
        "studyReward" : "£10",
},
];

class Sorter extends React.Component {
   constructor(props){
     super(props);
     this.handleSearch = this.handleSearch.bind(this);
     //Import axios and then we can set up our rows here
     //Use these dynamically generated rows for our searching
     this.state = {rows : studyRow, search : ''}; 
   }

   handleSearch(search){
      this.setState({search:search});
   }

    render(){
      return (
          <div className="Sorter">
            <StudySearch onSearchChange={this.handleSearch}></StudySearch>
            <div style={{marginTop:'5rem'}}></div>
            {studyRow.map(row => <StudyRow search={this.state.search} {...row}></StudyRow>)}
          </div>
      );
    }
}

export {Sorter}
