import React from 'react';
//import './Sorter.css';

class TimeInput extends React.Component {
  constructor(props){
    super(props);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleTimeChange(event){
    this.props.onTimeChange(event.target.value);
  }

  render() {
    return (
      <div>
        <label>
          Time: 
          <div>
            <input type="time" value={this.props.time} onChange={this.handleTimeChange} />
          </div>
        </label>
      </div> 
    );
  }
}

export {TimeInput}
