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
      startDate: moment(),
      endDate: moment(),
      countryCd: 'US',
      dates: {},
      numberOfDays: 7,
      day: '',
      month: '',
      year: '',
      holidays: [],
      holidayMods:[],
    }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDaysQty = this.handleDaysQty.bind(this);
    this.handleCountryCode = this.handleCountryCode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleHolidayResponse = this.handleHolidayResponse.bind(this);
    this.holidayMods = this.holidayMods.bind(this);
  }

  isValidDate(dateString) {
      // First check for the pattern
      if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
          return false;

      // Parse the date parts to integers
      let parts = dateString.split("/");
      let day = parseInt(parts[0], 10);
      let month = parseInt(parts[1], 10);
      let year = parseInt(parts[2], 10);

      // Check the ranges of month and year
      if(year < 1000 || year > 3000 || month === 0 || month > 12)
          return false;

      let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

      // Adjust for leap years
      if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
          monthLength[1] = 29;

      // Check the range of the day
      return day > 0 && day <= monthLength[month - 1];
  }

  handleDateChange (e) {
      let initialDate = e.target.value;
      let parts = initialDate.split("/");
      let day = parseInt(parts[0], 10);
      let month = parseInt(parts[1], 10) - 1;
      let year = parseInt(parts[2], 10);
      
      if (this.isValidDate(initialDate)) {
          console.log("Fecha armada es: " + day + "," + (month+1) + ","+ year);

          this.setState({ 
            startDate: moment([year, month, day]),
            day: day,
            month: month+1,
            year: year,
          }, 
          function() {
              console.log("Fecha nueva es: " + this.state.startDate.format());
              console.log("Día es: " + this.state.day);
              console.log("Mes es: " + this.state.month);
              console.log("Año es: " + this.state.year);
          });


      } else {
          console.log("Empty or invalid date format. Enter valid date in format dd/mm/yyyy");
      }
      console.log("Fecha actual es: " + moment().format());

      return { day:day, month:month, year:year };

  }

  handleDaysQty (e) {
      let daysQty = parseInt(e.target.value, 10);
      this.setState({ numberOfDays: daysQty }, function() {
          console.log("Number of days is: " + this.state.numberOfDays );
      });
  }

  handleCountryCode (e) {
      let countryCode = e.target.value;
      this.setState({ countryCd: countryCode }, function() {
          console.log("Country code is: " + this.state.countryCd);
      });
  }


  handleHolidayResponse(data) {
    console.log("Below is data called from parent App: ");
    console.log(data);
    this.setState({ holidays:[] });
    let holidayitem = this.state.holidays.slice();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {        
        if (data[key][0].date === data[key][0].observed) {
          holidayitem.push(data[key][0].date);
          this.setState({ holidays: holidayitem });
          console.log("Date: " + data[key][0].date + " - " + data[key][0].name);
        } else {
          holidayitem.push(data[key][0].observed);
          this.setState({ holidays: data[key][0].observed });
          console.log("Observed: " + data[key][0].observed + " - " + data[key][0].name);
        }
      }
    }
    console.log("From state: " + this.state.holidays);
  }

  handleSubmit (e) {
      e.preventDefault();

      let querystring = '';

      let parameters = {
        // Required
        country: this.state.countryCd,
        year:    2016,
        // Optional
        // month:    7,
        // day:      4,
        // previous  true,
        // upcoming  true,
        public:   true,
        // pretty:   true,
      };

      // https://holidayapi.com/v1/holidays?key=the_key?country=US&year=2016&month=08
      querystring += 'key=' + process.env.REACT_APP_HOLIDAY_KEY 
                  + '&country=' + parameters.country 
                  + '&year=' + parameters.year
                  + '&public=' + parameters.public
                  ;
      
      function search(query) {
          return fetch(`/holidays?${query}`, {
              accept: 'application/json',                
          }).then(checkStatus)
          .then(parseJSON);
      }

      function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          const error = new Error(`HTTP Error: ${response.statusText}`);
          error.status = response.statusText;
          error.response = response;
          console.log(error); // eslint-disable-line no-console
          throw error;
        }
      }

      function parseJSON(response) {
        return response.json();
      }

      search(querystring).then(result => {
          let holidayStr = result.holidays;
          console.log(holidayStr);
          this.setState({ dates: holidayStr }, function() {
                  console.log("Saved dates in form.js state is: ");
                  console.log(this.state.dates);
          });
          this.handleHolidayResponse(holidayStr);
          this.holidayMods();
      });

  }

  holidayMods () {
    console.log("This is the state holidays from holidayMods()");
    console.log(this.state.holidays);
    let holidaysArray = this.state.holidays;
    let holidaysMoment = holidaysArray.map(function(x) {
      return moment(x);
    });
    this.setState({ holidayMods: [] });
    let myHolidayMods = this.state.holidayMods;

    for (let hmod in holidaysMoment) {
      if (holidaysMoment.hasOwnProperty(hmod)) {
        let hmodObj = {};
        hmodObj = {
          date: holidaysMoment[hmod],
          classNames: [ 'holiday' ],
          component: [ 'day' ]
        }
        myHolidayMods.push(hmodObj);       
      }
    }
    this.setState({
      holidayMods: myHolidayMods
    });
    console.log("Below are the hmodObjs: ");
    console.log(myHolidayMods);
  }

  render() {
    let endDateCalc = moment(this.state.startDate).add(this.state.numberOfDays, 'days').endOf('month');

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
        <Form 
            handleHolidayResponse={this.handleHolidayResponse} 
            handleDateChange={this.handleDateChange} 
            handleDaysQty={this.handleDaysQty} 
            handleCountryCode={this.handleCountryCode}
            onSubmit={this.handleSubmit}
            />
        <hr />        
        <Calendar startDate={ this.state.startDate }
                  endDate={endDateCalc}                  
                  // size={12}
                  mods={
                    this.state.holidayMods
                  } 
        />
      </div>
    );
  }
}

export default App;
