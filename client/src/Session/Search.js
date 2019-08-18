import React from 'react';

export default class Search extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onSearchChange(e.target.value);
    }

    render(){
        return (
            <input className="search" placeholder="Search" onChange={this.handleChange}/>
        );
    }
}
