import React from 'react';
import './App.css';
import {Sorter} from './Sorter/Sorter.js';
import {StudySession} from './Session/StudySession.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <StudySession></StudySession>
      </header>
    </div>
  );
}

export default App;
//Sorter component
//<Sorter></Sorter>
