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
        return '';
      }
      return ' invisible';
    }

    const isHidden = shouldHide(); 

    return (
        <div className={`studyRow${isHidden}`}> 
          <div className="leftStudyRow">
              <div className="studySeperatorLeft">
                <span className="StudyText">{props.type}</span>
              </div>
              <div className="studySeperatorLeft">
                <span className="StudyTime">{props.time}</span>
              </div>
          </div>
          <div className="middleStudyRow">
            <div className="studySeperatorRight">
              <span className="StudyNote">{props.note}</span>
            </div>
          </div>
          <div className="endStudyRow">
            <div className="studySeperatorRight">
              <span className="StudyReward">£{props.reward}</span>
            </div>
            <div className="studySeperatorRight">
                <span className="StudyDate">{props.date}</span>
              </div>
          </div>
        </div>
    );
}
