import React, {Component} from 'react';

const colorsHex = {
    'Odaberi boju': '#000000',
    'Plava': '#288ff7',
    'Crvena': '#ff2b2b',
    'Zelena': '#2bff6e',
    'Žuta': '#cccc00',
    'Ljubičasta': '#af3afc',
    'Smeđa': '#733e02'
};


class Cell extends Component {
    render() {
        let color = null;
        if(this.props.value == 'X') color = this.props.color1;
        if(this.props.value == 'O') color = this.props.color2;

        return (
                <button style={{color: colorsHex[color]}} className='cell' onClick={this.props.onClick} disabled={this.props.value ? true : false}>
                    {this.props.value}
                </button>
        );
    }   
}

export default Cell;