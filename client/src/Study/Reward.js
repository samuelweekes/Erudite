import React from 'react';
import REWARD0  from '../assets/reward0.svg';
import REWARD20 from '../assets/reward20.svg';
import REWARD40 from '../assets/reward40.svg';
import REWARD80 from '../assets/reward80.svg';
export default class Reward extends React.Component {
  render() {
    let reward = null;
    if(this.props.reward >=80) {
      reward = REWARD80;
    } else if(this.props.reward >= 40) {
      reward = REWARD40;
    } else if (this.props.reward > 0){
      reward = REWARD20;
    } else {
      reward = REWARD0;
    }
    return (
      <div className="reward">
        <img className="reward-img" src={reward}></img>
      </div>
    );
  }
}