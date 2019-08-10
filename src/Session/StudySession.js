import React from 'react';
import {Reward} from './Reward.js';
//import './Sorter.css';

class StudySession extends React.Component {
  constructor(props){
    super(props);
  }


  render() {
    return (
      <div className="StudySession">
        <Reward reward={null}></Reward> 
      </div>
    );
  }
}

export {StudySession}
