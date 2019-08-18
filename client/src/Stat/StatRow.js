import React from 'react';

export default class StatRow extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="statRow">
        <div className="statRowLeft">{this.props.name}</div>
        <div className="statRowRight">{this.props.stat}</div>
      </div>
    )
  }
}