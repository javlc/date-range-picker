import React, { Component } from 'react';

class CountryCode extends Component {
    render() {
        return (
            <div className="country-code">
                <label>Código de país</label>
                <input type="text" placeholder="Ingrese código de país" />
            </div>
        );
    }
}

export default CountryCode