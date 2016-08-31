import React, { Component } from 'react';

class NumberOfDays extends Component {
    render() {
        return (
            <div className="number-days">
                <label>How many days ahead?</label>
                <input 
                    type="text" 
                    placeholder="Enter days quantity" 
                    onBlur={this.props.onBlur}
                />
            </div>
        );
    }
}

export default NumberOfDays;