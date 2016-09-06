import React, { Component } from 'react';
import Datepicker from '../datepicker/datepicker';
import NumberOfDays from '../number-of-days/numberOfDays';
import CountryCode from '../country-code/countryCode';

class Form extends Component {

    render () {
        return (
            <form id="calendar" onSubmit={this.props.onSubmit}>

                <Datepicker onBlur={this.props.handleDateChange} />

                <NumberOfDays onBlur={this.props.handleDaysQty} />

                <CountryCode onBlur={this.props.handleCountryCode} />

                <input type="submit" value="Send" />
            </form>
        );
    }
}

export default Form;