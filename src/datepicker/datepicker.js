import React, { Component } from 'react';

class Datepicker extends Component {

    render() {
        return (
            <div className="datepicker">        
                <label >Enter initial date</label>
                <input 
                    id="fecha-inicio" 
                    type="text" 
                    placeholder="dd/mm/yyyy" 
                    onBlur={this.props.onBlur}
                />
            </div>
        );
    }
}

export default Datepicker;