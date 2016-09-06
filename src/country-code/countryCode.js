import React, { Component } from 'react';

class CountryCode extends Component {
    render() {
        return (
            <div className="country-code">
                <label>Country Code</label>
                <input 
                    type="text" 
                    placeholder="Enter country code" 
                    onBlur={this.props.onBlur}
                />
            </div>
        );
    }
}

export default CountryCode