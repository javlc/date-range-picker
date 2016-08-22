import moment from 'moment';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './form/form';
import { Calendar } from 'react-calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React Datepicker</h2>
          <p>by Javi Lopez C.</p>
        </div>
        <p className="App-intro">
          Please enter the requested parameters.
        </p>
        <Form />
        <hr />        
        <Calendar startDate={ moment().startOf('year') }
                  endDate={ moment().endOf('year') }
                  weekNumbers={ false }
                  size={12}
                  mods={
                    [
                      {
                        date: moment(),
                        classNames: [ 'current' ],
                        component: [ 'day', 'month']
                      }
                    ]
                  } />
      </div>
    );
  }
}

export default App;
