import React from 'react';
import './StudySearch.css';

class StudySearch extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.onSearchChange(e.target.value);
    }

    render(){
        return (
            <input className="StudySearch" placeholder="Search" onChange={this.handleChange}/>
        );
    }
}

export {StudySearch}
