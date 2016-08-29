import moment from 'moment';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './form/form';
import { Calendar } from 'react-calendar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(),
      day: '',
      month: '',
      year: '',
    }
  }

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
        <Calendar startDate={ this.state.date }
                  endDate={ moment(this.state.date).add(7, 'days').endOf('month') }
                  weekNumbers={ false }
                  // size={12}
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
