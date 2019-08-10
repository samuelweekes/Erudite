import React from 'react';
import happy from '../assets/happy_face.png';
import neutral from '../assets/neutral_face.png';
import './Reward.css';


class Reward extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);

    this.state = {time: '', type: ''};
  }

  handleSubmit(event){
    console.log(`The form was submitted time is ${this.state.time} and type is ${this.state.type}`);
    event.preventDefault();
  }

  handleTimeChange(event){
    this.setState({time : event.target.value}); 
  }

  handleTypeChange(event){
    this.setState({type: event.target.value}); 
  }

  showReward(){
    if(this.props.reward === null || 
       this.props.reward === undefined)
    {
      return;
    }
    
    const reward = this.props.reward ? happy : neutral;
    return reward;
  }

  render() {
    return (
      <div>
      <div>
        <h3>Add a Study Session!</h3>
      </div>
        <div className="rewardImg">
          <img src={this.showReward()}/>
        </div>
        <form className="rewardForm" onSubmit={this.handleSubmit}>
          <div>
            <label>
              Time: 
              <div>
                <input type="time" onChange={this.handleTimeChange} />
              </div>
            </label>
           </div> 
          <div>
            <label>
              Type: 
              <div>
                <input type="text" onChange={this.handleTypeChange} />
              </div>
            </label>
          </div> 
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export {Reward}
