import React from 'react';
import './StudyRow.css'

export function StudyRow(props) {

    const shouldHide = function(){
      const text = props.studyText.toLowerCase();
      const note = props.studyNote.toLowerCase(); 
      const search = props.search.toLowerCase(); 
      if(text.includes(search) || note.includes(search)){
        return 'StudyRow';
      }
      return 'invisible StudyRow';
    }

    const isHidden = shouldHide(); 

    return (
        <div className={`StudyRow ${isHidden}`}> 
            <span className="StudyTime">{props.studyTime}</span>
            <span className="StudyText">{props.studyText}</span>
            <span className="StudyNote">{props.studyNote}</span>
            <span className="StudyReward">{props.studyReward}</span>
        </div>
    );
}
