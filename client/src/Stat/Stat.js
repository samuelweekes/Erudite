import React from 'react';
import StatRow from './StatRow.js';
import './Stat.css';

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {month: [{name: 'Study Sessions', stat: 123},{name: 'Rewards', stat: 123},{name: 'Study', stat: 123},{name: 'Rewards', stat: 123},{name: 'Study Sessions', stat: 123},{name: 'Rewards', stat: 123},{name: 'Study', stat: 123},{name: 'Rewards', stat: 123}], allTime: [{name: 'Rewards', stat: 123},{name: 'Study Sessions', stat: 123},{name: 'Maths', stat: 123}]};
    }

    render(){
        return (
           <div class="stat">
             <div className="statsLeft">
              <h1>This Month</h1>
              <div className="statSeperator"> 
                <hr className="statLine"/>
              </div>
              <div className="statContainerLeft">
                {this.state.month.map(row => 
                  <StatRow key={row._id} {...row}></StatRow>)
                }
              </div>
             </div>
             <div className="statsRight">
              <h1>All Time</h1>
              <div className="statSeperator"> 
                <hr className="statLine"/>
              </div>
              <div className="statContainerRight">
                {this.state.allTime.map(row => 
                  <StatRow key={row._id} {...row}></StatRow>)
                }
              </div>
             </div>
           </div>
        );
    }
}
