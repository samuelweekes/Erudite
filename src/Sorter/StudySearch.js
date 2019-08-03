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
        const search = this.props.search;
        return (
            <input className="StudySearch" onChange={this.handleChange}/>
        );
    }
}

export {StudySearch}
