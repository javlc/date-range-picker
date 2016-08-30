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
      holidays: [],
    }

    this.handleHolidayResponse = this.handleHolidayResponse.bind(this);
  }

  handleHolidayResponse(data) {
    console.log("Below is data called from parent App: ");
    console.log(data);
    let holidaydates=[];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let holidayobject = data[key];
        for (let k in holidayobject) {
          if (holidayobject.hasOwnProperty(k)) {
            holidaydates = holidayobject[k];
          }
        }
      }
      let holidayitem = this.state.holidays.slice();
      if (holidaydates.date === holidaydates.observed) {
        holidayitem.push(holidaydates.date);
        this.setState({ holidays: holidayitem });
        console.log("Date: " + holidaydates.date + " - " + holidaydates.name);
      } else {
        holidayitem.push(holidaydates.observed);
        this.setState({ holidays: holidaydates.observed });
        console.log("Observed: " + holidaydates.observed + " - " + holidaydates.name);
      }
    }
    console.log("From state: " + this.state.holidays);
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
        <Form handleHolidayResponse={this.handleHolidayResponse}/>
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
