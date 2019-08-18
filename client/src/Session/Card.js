import React from 'react';

export default class Card extends React.Component {
  constructor(props){
    super(props);
    this.shouldHide = this.shouldHide.bind(this);
  }

  shouldHide(){
    if(this.props.type === undefined || 
       this.props.note === undefined ||
       this.props.search === undefined){
         return;
       }
    const text = this.props.type.toLowerCase();
    const note = this.props.note.toLowerCase(); 
    const search = this.props.search.toLowerCase(); 
    if(text.includes(search) || note.includes(search)){
      return '';
    }
    return ' invisible';
  }

  render(){
    const isHidden = this.shouldHide(); 
    return (
      <div className={`card ${isHidden}`}> 
        <div className="left">
          <div className="upper cardType">{this.props.type}</div>
          <div className="lower cardTime">{this.props.time}</div>
        </div>
        <div className="center cardNote">{this.props.note}</div>
        <div className="right">
          <div className="upper cardReward">£{this.props.reward}</div>
          <div className="lower cardDate">{this.props.date.substring(0,10)}</div>
        </div>
        <hr className="cardLine"></hr>
      </div>
    )
  }
}