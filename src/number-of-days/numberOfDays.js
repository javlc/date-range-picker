import React, { Component } from 'react';

class NumberOfDays extends Component {
    render() {
        return (
            <div className="number-days">                
                <label>Cantidad de días</label>
                <input type="text" placeholder="Ingrese cantidad de días" />
            </div>
        );
    }
}

export default NumberOfDays;