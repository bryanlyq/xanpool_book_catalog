import React from "react";
// import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Book from './pages/Book';

function App(){

  return(
  
    <Router>
      <div>
        <Switch>
            <Route exact path = '/' component = {Home} /> 
            <Route exact path = '/book/:id' component = {Book} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
