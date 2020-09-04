import React from 'react';
import{
  Link
} from 'react-router-dom';



class About extends React.Component  {
  render(){
  return (
    <div className = "container-fluid">
      <h1 id = "title">About</h1>
      <div id = "abtContainer">
        <p className = "pText">
          "The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks.
           Each interval is known as a pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as a university student." -wikipedia
        </p>
        <p id = "more" className = "pText">
          If you'd like to read more about this technique and the process of using it, visit <a target = "_blank" href = "https://en.wikipedia.org/wiki/Pomodoro_Technique">
          the wiki</a>.
        </p>
      </div>
      <div id = "back">
      <Link to = "/" id ="backLink">Back</Link>
      </div>
    </div>
  );
}
}

export default About;
