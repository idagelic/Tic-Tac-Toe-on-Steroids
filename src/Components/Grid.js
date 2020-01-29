import React, {Component} from 'react';
import Cell from './Cell.js';

const colorsHex = {
    'Odaberi boju': '#000000',
    'Plava': '#288ff7',
    'Crvena': '#ff2b2b',
    'Zelena': '#2bff6e',
    'Žuta': '#cccc00',
    'Ljubičasta': '#af3afc',
    'Smeđa': '#733e02'
};

class Grid extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: this.props.status
        };
    }

    createGridReturn(){
        let gridReturn = [];
        for(let i=1; i<=9; i++){
            gridReturn.push(<Cell id={this.props.first + i} key={this.props.first + i} value={this.props.cells[this.props.first + i]} onClick={()=>this.props.onClick(this.props.first + i)} color1={this.props.color1} color2={this.props.color2}/>);
        }
        return gridReturn;
    }

    render() {
        let returnHtml = this.createGridReturn();

        let className = 'overlay';

        let color = null;

        if(this.props.status == 'X') color = this.props.color1;
        if(this.props.status == 'O') color = this.props.color2;

        if(this.props.status == null) className = 'display-none';

        return (            
                <div className='grid'>
                    <div className={className}>
                        <div style={{color: colorsHex[color]}} className='grid-status-letter'>{this.props.status}</div>
                    </div>                    
                    {returnHtml}                    
                </div>            
        );
    }
}

export default Grid;