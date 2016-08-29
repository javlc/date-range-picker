import React, { Component } from 'react';
import moment from 'moment';

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fechaInicio: new Date(),
            numeroDias: 7,
            codigoPais: 'US',
            dates: {},
        };

        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDaysQty = this.handleDaysQty.bind(this);
        this.handleCountryCode = this.handleCountryCode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

            this.setState(
                { fechaInicio: moment([year, month, day]) }, 
                function() {
                    console.log("Fecha nueva es: " + this.state.fechaInicio.format());
            });


        } else {
            console.log("Invalid date format. Enter valid date in format dd/mm/yyyy");
        }
        console.log("Fecha actual es: " + moment().format());

    }

    handleDaysQty (e) {
        let daysQty = parseInt(e.target.value, 10);
        this.setState({ numeroDias: daysQty }, function() {
            console.log("Number of days is: " + this.state.numeroDias );
        });
    }

    handleCountryCode (e) {
        let countryCode = e.target.value;
        this.setState({ codigoPais: countryCode }, function() {
            console.log("Country code is: " + this.state.codigoPais);
        });
    }

    handleSubmit (e) {
        e.preventDefault();

        let querystring = '';

        let parameters = {
          // Required
          country: 'US',
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
                    + '&public=' + parameters.public;
        
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
        });

    }

    render () {
        return (
            <form id="calendar" onSubmit={this.handleSubmit}>
                <div className="datepicker">        
                    <label >Enter initial date</label>
                    <input 
                        id="fecha-inicio" 
                        type="text" 
                        placeholder="dd/mm/yyyy" 
                        onBlur={this.handleDateChange}
                    />
                </div>
                 <div className="number-days">
                    <label>How many days ahead?</label>
                    <input 
                        type="text" 
                        placeholder="Enter days quantity" 
                        onBlur={this.handleDaysQty}
                    />
                </div>
                <div className="country-code">
                    <label>Country Code</label>
                    <input 
                        type="text" 
                        placeholder="Enter country code" 
                        onBlur={this.handleCountryCode}
                    />
                </div>
                <input type="submit" value="Send" />
            </form>
        );
    }
}

export default Form;