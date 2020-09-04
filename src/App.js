import React from 'react';
import Main from './components/main.js'
import About from './components/about.js'
import "./assets/main.css"
import{
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div>
        <Route exact path = "/" component = {Main} />

        <Route exact path = "/about" component = {About} />
      </div>
    </Router>
  );
}

export default App;
