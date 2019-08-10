import React from 'react';
import './StudyRow.css'

export function StudyRow(props) {

    const shouldHide = function(){
      if(props.type === undefined || 
         props.note === undefined ||
         props.search === undefined){
           return;
         }
      const text = props.type.toLowerCase();
      const note = props.note.toLowerCase(); 
      const search = props.search.toLowerCase(); 
      if(text.includes(search) || note.includes(search)){
        return;
      }
      return 'invisible';
    }

    const isHidden = shouldHide(); 

    return (
        <div className={`studyRow ${isHidden}`}> 
            <span className="StudyTime">{props.time}</span>
            <span className="StudyText">{props.type}</span>
            <span className="StudyNote">{props.note}</span>
            <span className="StudyReward">{props.reward}</span>
        </div>
    );
}
