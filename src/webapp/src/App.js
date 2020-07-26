import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";


function App() {
  return (
    <div>
        <Router>
          <Route exact path="/" component={() => { return (<div>rahull</div>)}} />
          <Route exact path="/view" component={() => { return (<div>rahull view 12</div>)}} />
          <Route exact path="/view1" component={() => { return (<div>rahull view543</div>)}} />
        </Router>
    </div>
  );
}

export default App;
