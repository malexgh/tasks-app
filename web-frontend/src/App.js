import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import NewTask from './pages/NewTask';
import './App.css';

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/newTask" component={NewTask} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
