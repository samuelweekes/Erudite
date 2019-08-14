import React from 'react';
import party from '../assets/party_face.png';
import happy from '../assets/happy_face.png';
import smile from '../assets/smile_face.png';
import sad from '../assets/crying_face.png';
import './Reward.css';



class Reward extends React.Component {

  showReward(){
    const reward = {};
    if(this.props.reward === null || 
       this.props.reward === undefined)
    {
      reward.text = "Enter a study session!"
      reward.image = null;
      return reward;
    }

    const textParty = `You earned a huge reward of £${this.props.reward}, get yo' ass on Amazon!`;
    const textHappy = `You earned a reward of £${this.props.reward}, treat yo'self!`;
    const textSmile = `You earned a small reward of £${this.props.reward}, not bad!`;
    const textSad = `You didnt earn a reward, better luck next time!`;
    
    if(this.props.reward > 50){
      reward.image = party;
      reward.text = textParty;
    } else if (this.props.reward > 20) {
      reward.image = happy;
      reward.text = textHappy;
    } else if (this.props.reward > 0){
      reward.image = smile;
      reward.text = textSmile;
    } else {
      reward.image = sad;
      reward.text = textSad;
    }
    return reward;
  }

  render() {
    const reward = this.showReward();
    return (
      <div className="reward">
        <div className="rewardText">
          <span>{reward.text}</span>
        </div>
        <div className="rewardImg">
          <img src={reward.image} alt=""/>
        </div>
      </div>
    );
  }
}

export {Reward}
